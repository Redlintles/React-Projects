import React from 'react'
import "./Footer.scss";

type Props = {}

function Footer({ }: Props) {
  return (
    <footer className="footer">
      <p className="footer__copy">
        <span>MoviesLib</span>
         &copy; 2022
      </p>
    </footer>
  )
}

export default Footer