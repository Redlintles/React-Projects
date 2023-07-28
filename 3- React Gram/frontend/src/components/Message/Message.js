import styles from "./Message.module.css";

import React from 'react'

const Message = ({ msg, type }) => {

  let className;

  switch(type) {
    case "error":
      className = `${styles.message} ${styles.error}`;
      break;
    case "success":
      className = `${styles.message} ${styles.success}`;
      break;
  }


  return (
    <div className={className}>
      {msg}
    </div>
  )
}

export default Message