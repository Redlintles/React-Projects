import React from 'react'

import { resetComponentMessage } from "../../utils/utilities";

import styles from "./Home.module.css";
// Components
import ShowPhoto from "../../components/ShowPhoto/ShowPhoto";
import { Link } from 'react-router-dom';
// Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getAllPhotos, likePhoto } from '../../slices/photoSlice';

const Home = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(store => store.auth)
  const { photos, loading, error } = useSelector(store => store.photo)

  useEffect(() => {
    if (dispatch) {
      dispatch(getAllPhotos());
    }
  }, [dispatch])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.home}>
      <h2>Veja os nossos posts mais recentes!</h2>
      {photos && photos.length > 0 && photos.map((photo, i) => (
        <div key={photo._id} className={styles.photoWrapper}>
          <ShowPhoto photo={photo} type="home" />
        </div>
      ))}
      {photos && photos.length === 0 && (
        <div className={styles.noPosts}>
          <h2>Ainda não há fotos Publicadas</h2>
          <p>Não foram encontrados posts</p>
          <Link to={`/users/${user._id}`} className="btn">Clique Aqui Para criar o primeiro post...</Link>
        </div>
      )}


    </div>
  )
}

export default Home