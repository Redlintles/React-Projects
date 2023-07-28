import styles from "./Footer.module.scss";

type Props = {}

function Footer({ }: Props) {
  return (
    <footer className={styles.footer}>
      <p
        className={styles.footer__copy}
      >
        <span>React + TS Todo</span>
        &copy; 2022
      </p>
    </footer>
  )
}

export default Footer