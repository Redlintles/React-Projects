import React, { useState } from 'react'

import {
  RxEyeOpen,
  RxEyeClosed
} from "react-icons/rx";

import styles from "./ShowAndHidePassword.module.css"


const ShowAndHidePassword = ({name,placeholder, val, setter }) => {
  const [visible, setVisible] = useState(false);


  return (
    <div className={styles.inputContainer}>
      <input
        type={visible ? "text" : "password"}
        value={val || ""}
        onChange = {setter}
        placeholder= {placeholder || ""}
        name = {name || ""}

      />
      <button
      type="button" 
      onClick={() => setVisible(!visible)}
      >
        {visible && <RxEyeOpen />}
        {!visible && <RxEyeClosed />}
      </button>
    </div>
  )
}

export default ShowAndHidePassword