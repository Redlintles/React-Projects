import React from 'react'
import styles from "./Auth.module.css";

// Components

import { Link } from "react-router-dom";
import FormFeedback from '../../components/FormFeedback/FormFeedback';
import ShowAndHidePassword from '../../components/ShowAndHidePassword/ShowAndHidePassword';

// Hooks

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Redux

import { register, reset } from "../../slices/authSlice"


// Others

import {setInputValue} from "../../utils/utilities";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector(store => store.auth);

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    dispatch(register(user));
  };

  // Clean auth states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch])







  return (
    <section className={styles.formSection}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>Cadastre-se para ver as fotos do seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          name="name"
          value={name}
          onChange={setInputValue(setName)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={setInputValue(setEmail)}
        />
        <ShowAndHidePassword
          placeholder= "Digite sua senha"
          name="password"
          val={password}
          setter = {setInputValue(setPassword)} 
        />
        <ShowAndHidePassword
          placeholder="Confirme a sua senha"
          name="confirmPassword"
          val = {confirmPassword}
          setter = {setInputValue(setConfirmPassword)}
        
        />
        <FormFeedback loading={loading} error={error}/>
      </form>

      <p className={styles.linkCall}>Já tem conta? <Link to="/login">Clique Aqui</Link></p>

    </section>
  )
}

export default Register