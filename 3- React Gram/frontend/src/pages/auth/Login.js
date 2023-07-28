import React from 'react'
import styles from "./Auth.module.css";

// Components

import { NavLink } from "react-router-dom";
import FormFeedback from '../../components/FormFeedback/FormFeedback';
import ShowAndHidePassword from '../../components/ShowAndHidePassword/ShowAndHidePassword';

// Hooks

import { useEffect, useState } from 'react';

// Redux

import { useSelector, useDispatch } from "react-redux";
import {login, reset} from "../../slices/authSlice";


import {setInputValue} from "../../utils/utilities";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const {loading, error} = useSelector(store => store.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    dispatch(login(data));

  }

  useEffect(()=> {
    dispatch(reset());
  },[dispatch]);

  return (
    <section className={styles.formSection}>
      <h2>ReactGram</h2>
      <p className={styles.subtitle}>Faça o Login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          name="email"
          value={email || ""}
          onChange={setInputValue(setEmail)}
        />
        <ShowAndHidePassword 
          placeholder="Senha"
          val = {password}
          setter = {setInputValue(setPassword)}
        />
        <FormFeedback loading={loading} error={error}/>
      </form>
      <p className={styles.linkCall}>Não tem uma conta? <NavLink to="/register">Clique Aqui</NavLink></p>
    </section>
  )
}

export default Login