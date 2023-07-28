
import { db } from "../FB/config";

import { deleteDoc, doc} from "firebase/firestore"
import { useState, useReducer, useEffect } from "react";


const initialState = {
  loading: null,
  error: null
}

const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state
  }
};



export function useDeleteDocument(dbCollection) {

  const [response, dispatch] = useReducer(deleteReducer,initialState);
  const [cancelled, setCancelled] = useState();

  function checkCancelBeforeDispatch(action) {
    if (!cancelled) {
      dispatch(action);
    }
  }


  const deleteDocument = async function(id) {

    checkCancelBeforeDispatch({
      type: "LOADING"
    })

    try {
      const ref = await doc(db,dbCollection,id);
      const res = await deleteDoc(ref);

      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: res
      })

    } catch(err) {
      console.log(err.message);
      checkCancelBeforeDispatch({
        type: "ERROR"
      })
    }
  }
  
  useEffect(()=> {
    return ()=> {setCancelled(true)};
  },[])

  
  return {deleteDocument, response}
}