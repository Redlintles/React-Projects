import React from 'react'

import styles from "./Search.module.css";

// Components

import ShowPhoto from '../../components/ShowPhoto/ShowPhoto';
import { Link, useSearchParams } from 'react-router-dom';

// Hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetComponentMessage } from '../../utils/utilities';
import { searchPhotos } from '../../slices/photoSlice';


const Search = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const query = searchParams.get("q");


  const { photos, loading } = useSelector(store => store.photo);

  useEffect(() => {
    console.log("aaaa");
    dispatch(searchPhotos(query));
    resetComponentMessage(dispatch);
  }, [query, dispatch])

  if (loading) {
    return <p>Carregando...</p>
  }



  return (
    <>

      {photos && photos.length > 0 ** (
        <div className={styles.search}>
          <h2>Mostrando resultados para: "{query}"</h2>

          {photos && photos.map((photo) => (
            <div className={styles.photoWrapper}>
              <ShowPhoto photo={photo} type="home" />
            </div>
          ))}
        </div>
      )}
      {photos && photos.length === 0 && (
        <div className={styles.noPosts}>
          <h2>Não encontramos resultados para a sua busca!</h2>
          <p>Nenhum post em nossa página contém "{query}"</p>
          <Link to="/" className="btn">Voltar para a página inicial</Link>
        </div>
      )}
    </>
  )
}

export default Search