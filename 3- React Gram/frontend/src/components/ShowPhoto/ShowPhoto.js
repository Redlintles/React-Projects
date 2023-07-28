import React from 'react'

import styles from "./ShowPhoto.module.css";


import { Link } from "react-router-dom";

import { upload } from "../../utils/config";

import LikeContainer from '../LikeContainer/LikeContainer';

import { useSelector } from "react-redux";

import { BsArrowLeft } from 'react-icons/bs';


const ShowPhoto = ({ photo, type }) => {

  const { user } = useSelector(store => store.auth);

  function back() {

    window.history.back();
  }

  return (
    <div
      className={
        type === "individual"
          ? styles.showPhoto
          : `${styles.homePhoto} ${styles.showPhoto}`}
    >
      {photo && (
        <>
          <img
            src={`${upload}/photos/${photo.image}`}
            alt={photo.title}
          />
          <h2>{photo.title}</h2>

          <p>
            Publicada por:
            <Link
              to={`/users/${photo.userId}`}
            >
              {photo.userName}
            </Link>
          </p>

          <LikeContainer
            photo={photo}
            user={user}
            type={type}
          />

          {type === "individual" && (
            <button
              onClick={back}
              className={styles.backBtn}
            >
              <BsArrowLeft />
              Voltar
            </button>
          )}
          {type === "home" && (
            <Link
              className="btn"
              to={`/photos/${photo._id}`}>
              Ver Mais...
            </Link>
          )}

        </>
      )}
    </div>
  )
}

export default ShowPhoto