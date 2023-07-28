import React from 'react'
import styles from "./Header.module.scss";

type Props = {}

function Header({}: Props) {
  return (
    <header className={styles.header_container}>
    <h1 className={styles.header__title}>React + TS Todo</h1>
    </header>
  )
}

export default Header