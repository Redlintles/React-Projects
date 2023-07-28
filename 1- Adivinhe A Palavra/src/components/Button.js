import React from 'react'


import "./Button.css";

const Button = ({txt,click}) => {
  return (
    <button className="btn btn--skin" onClick={click}>{txt}</button>
  )
}

export default Button