import { useState, useEffect } from "react";

import { db } from "../FB/config";

import {
  doc,
  getDoc
} from "firebase/firestore";

export const useFetchDocument = (docCollection,uid) => {

  const [document, setDocument] = useState();
  const [cancelled, setCancelled] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    async function loadDoc() {
      if (cancelled) { return };
      
      setLoading(true);

      try {
        const docRef = await doc(db,docCollection,uid);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());

        setLoading(false);
      } catch(error) {
        setError(error.message);
        console.log(error);
        setLoading(false);
      }
    }

    loadDoc();
  }, [docCollection, uid, cancelled])

  useEffect(() => {
    return () => setCancelled(true);
  },[])

  return { document, loading, error };

}

