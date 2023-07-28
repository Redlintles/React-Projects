import { useState, useEffect } from "react"

// Hooks

import { useAuthentication } from '../../hooks/useAuthentication';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();


  function setInputState(setter) {
    const fn = (e) => { setter(e.target.value) };
    return fn;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const data = {
      name,
      email,
      password
    };
    if (password !== confirmedPass) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser(data);
    console.log(res);
  }

  useEffect(()=> {
    if(authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="form-container">
      <h1>Cadastre-se para postar</h1>
      <p>Crie sua conta e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="name"
            placeholder="Insira seu nome..."
            onChange={setInputState(setName)}
            required
            value={name}
          />
        </label>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="Insira seu email..."
            onChange={setInputState(setEmail)}
            required
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            placeholder="Insira sua senha..."
            onChange={setInputState(setPassword)}
            required
            value={password}
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha..."
            onChange={setInputState(setConfirmedPass)}
            required
            value={confirmedPass}
          />
        </label>

        {!loading && <button type="submit" className="btn">Cadastrar</button>}
        {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register