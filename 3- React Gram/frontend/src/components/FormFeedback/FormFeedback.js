import React from 'react'

import Message from "../Message/Message";

const FormFeedback = ({ loading, error }) => {
  return (
    <>
      {!loading && <button type="submit" className="btn">Enviar</button>}
      {loading && <button type="submit" className="btn" disabled>Aguarde...</button>}
      {error && <Message type="error" msg={error} />}
    </>
  )
}

export default FormFeedback