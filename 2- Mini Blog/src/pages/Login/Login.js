import { useEffect, useState } from "react"
import { useAuthentication } from "../../hooks/useAuthentication";



const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { loading, error: authError, signIn} = useAuthentication();

  useEffect(()=> {
    if(authError) {
      setError(authError)
    }
  },[authError]);

  async function handleSubmit(e) {
    e.preventDefault()
    setError("");
    const data = {
      email,
      password
    };

    const res = await signIn(data);
    console.log(res);
  }


  function setInputState(setter) {
    const fn = (e) => { setter(e.target.value) };
    return fn;
  }
  return (
    <div className="form-container">
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form onSubmit={handleSubmit}>
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

        {!loading && <button type="submit" className="btn">Entrar</button>}
        {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}

      </form>
    </div>
  )
}

export default Login