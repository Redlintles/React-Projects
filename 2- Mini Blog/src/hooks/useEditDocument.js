
import { db } from '../FB/config';

import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { useEffect, useReducer, useState } from 'react';


const initialState = {
  loading: null,
  error: null
}


const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state
  }
};


export function useEditDocument(docCollection) {

  const [response, dispatch] = useReducer(updateReducer, initialState);
  const [cancelled, setCancelled] = useState(false);

  function checkCancelBeforeDispatch(action) {
    if (!cancelled) {
      dispatch(action);
    }
  }

  const edit = async function (data, id) {

    checkCancelBeforeDispatch({
      action: "LOADING"
    })

    try {
      const ref = await doc(db, docCollection, id);
      const res = await updateDoc(ref, {
        ...data,
        lastEdit: Timestamp.now()
      });

      checkCancelBeforeDispatch({
        action: "UPDATED_DOC",
        payload: res,
      })
    } catch (error) {
      console.log(error.message);
      checkCancelBeforeDispatch({
        action: "ERROR"
      })
    }
    
  }
  
  useEffect(() => {
    return () => {setCancelled(true)}
  }, [])
  return { edit, response }
}