import React from 'react'

import "./Letter.css";

const Letter = ({char}) => {
  return (
    <div className="letter letter--skin letter--hidden">{char}</div>
  )
}

export default Letter