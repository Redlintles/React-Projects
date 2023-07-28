import {db} from "../FB/config";


import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut

} from "firebase/auth";



import { useState, useEffect } from "react";


export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  function checkIfItsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfItsCancelled();
    setLoading(true)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {
        displayName: data.name
      })
      
      setLoading(false);
      return user;
      
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      
      let systemErrorMessage;

      setError(null);

      if(error.message.includes("password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres!";
      } else if(error.message.includes("email-already")) {
        systemErrorMessage = "Email Já cadastrado";
      } else if(error.message.includes("email")) {
        systemErrorMessage = "Email Inválido";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor, tente mais tarde";
      }

      setLoading(false);
      setError(systemErrorMessage);

    }
    console.log("Hey! Listen")
  };

  const signIn = async(data) => {
    checkIfItsCancelled();

    setLoading(true);
    setError(false)

    try {
      await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      setLoading(false);

    } catch(error) {
      let systemErrorMessage;

      if(error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if(error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha Incorreta"
      } else {
        systemErrorMessage = "Ocorreu Algum Erro, por favor tente mais tarde";
      }

      setError(systemErrorMessage);
      setLoading(false)
    }
    

  }

  const logout = () => {
    checkIfItsCancelled();
    signOut(auth);
  }

  useEffect(() => {
    return () => setCancelled(true);
  },[])


  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    signIn
  };

}