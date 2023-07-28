import { useState, useEffect, useReducer } from "react";
import { db } from "../FB/config";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null
}

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state
  }
};

export function useInsertDocument(docCollection, bool=false) {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  function checkCancelBeforeDispatch(action) {
    if (!cancelled) {
      dispatch(action);
    }
  }

  const insertDocument = async (document) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      console.log("doc start")
      let insertedDocument;
      const newDocument = { ...document, createdAt: Timestamp.now() };
      if(!bool) {
        insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
        )
      } else {
        insertedDocument = await setDoc(
          doc(db, docCollection, `${newDocument.id}`),
          newDocument
        )
      }


      console.log("doc submit")
      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertedDocument
      })


    } catch (error) {
      console.log("doc err");
      console.log(error.message);
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message
      })
    }
  }

  useEffect(() => {
    return () => {
      setCancelled(true);
    }
  }, [])

  return { insertDocument, response }
}