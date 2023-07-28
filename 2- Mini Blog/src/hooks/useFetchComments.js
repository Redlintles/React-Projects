
import { useState, useEffect } from "react";
import { query, orderBy, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "../FB/config";

export const useFetchComments = (dbCollection, postId) => {

  const [documents, setDocuments] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {

      setLoading(true);
      try {
        const collectionRef = await collection(db, dbCollection);
        let q = query(
          collectionRef,
          where("postId", "==", `${postId}`),
          orderBy("createdAt", "desc")
        );

        await onSnapshot(q, (snap) => {
          setDocuments(
            snap.docs.map((doc) => {
              return {
                ...doc.data()
              }
            })
          )
        })
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);

      }


    }

    fetchComments();

  }, [dbCollection, postId])


  return { documents, loading, error };
}
