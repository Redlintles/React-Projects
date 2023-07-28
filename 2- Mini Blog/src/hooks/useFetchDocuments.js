import { useState, useEffect } from "react";

import { db } from "../FB/config";

import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {

  const [documents, setDocuments] = useState();
  const [cancelled, setCancelled] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function loadData() {
      if (cancelled) { return };
      setLoading(true)

      const collectionRef = await collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = await query(
            collectionRef,
            where("tagsArr", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );

        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"))

        }

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),


              }
            })
          )
        })

        setLoading(false)
      } catch (err) {
        console.log(err);
        setError(err.message);
        setLoading(false)
      }
    }

    loadData();
  }, [docCollection, search, uid, cancelled])

  useEffect(() => {
    return () => setCancelled(true);
  })

  return { documents, loading, error };

}

