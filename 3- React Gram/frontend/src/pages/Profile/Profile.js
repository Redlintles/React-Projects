import React from 'react'

import styles from "./Profile.module.css";

import { upload } from "../../utils/config";


// components

import Message from "../../components/Message/Message";
import FormFeedback from '../../components/FormFeedback/FormFeedback';
import Photo from "../../components/Photo/Photo"

// hooks

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Redux

import { getUserDetails } from '../../slices/userSlice';
import { publishPhoto, getUserPhotos, updatePhoto, } from '../../slices/photoSlice';

// Utils

import { resetComponentMessage, setInputValue } from '../../utils/utilities';

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, loading } = useSelector(store => store.user);
  const { user: userAuth } = useSelector(store => store.auth);
  const {
    photos,
    loading: PhotoLoading,
    error: PhotoError,
    message
  } = useSelector(store => store.photo);

  // New Photo

  const [title, setTitle] = useState("");
  const [image, setImg] = useState("");

  const newPhotoForm = useRef();

  function handleFile(e) {
    const image = e.target.files[0];
    setImg(image);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const photoData = {
      title,
      image,
    }

    const data = new FormData();

    Object.keys(photoData).forEach(key => {
      data.append(key, photoData[key])
    })


    dispatch(publishPhoto(data));

    setTitle("");

    resetComponentMessage(dispatch)
  }

  // Edit Photo

  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (editData) {
      setNewTitle(editData.title);
    }

  }, [editData])

  function handleEdit(e) {
    e.preventDefault();

    const data = {
      title: newTitle,
      id: editData._id
    }

    dispatch(updatePhoto(data));

    setTimeout(()=> {
      setShowEdit(false);
    },2500)
    resetComponentMessage(dispatch);
  }

  // Photo

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPhotos(id));

  }, [dispatch, id])


  if (loading) {
    return <p>Carregando...</p>
  }
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profileHeader}>
          {user.profileImage && (
            <img src={`${upload}/users/${user.profileImage}`} alt={user.name} />
          )}
          <article className={styles.profileDesc}>
            <h2>{user.name}</h2>
            <p>{user.bio}</p>
          </article>
        </div>
        {id === userAuth._id && (
          <>
            {!showEdit && (
              <div className={styles.newPhoto} ref={newPhotoForm}>
                <h2>Compartilhe algum momento seu:</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    <span>Título para a foto:</span>
                    <input
                      type="text"
                      placeholder="Insira um título..."
                      value={title}
                      onChange={setInputValue(setTitle)}
                      required
                      name="title"
                    />
                  </label>
                  <label>
                    <span>Imagem:</span>
                    <input
                      type="file"
                      placeholder="Insira uma Imagem..."
                      onChange={handleFile}
                      name="image"
                      required
                    />
                  </label>

                  <FormFeedback loading={PhotoLoading} error={PhotoError} />
                </form>

              </div>
            )}
            {showEdit && (
              <div className={styles.editPhoto}>
                <p>Editando:</p>
                {editData && (
                  <img src={
                    `${upload}/photos/${editData.image}`
                  } alt="" />
                )}
                <form onSubmit={handleEdit}>
                  <label>
                    <span>Título para a foto:</span>
                    <input
                      type="text"
                      placeholder="Insira um título..."
                      value={newTitle}
                      onChange={setInputValue(setNewTitle)}
                      required
                      name="title"
                    />
                  </label>

                  <FormFeedback loading={PhotoLoading} error={PhotoError} />
                  <button
                    className="btn"
                    onClick={() => {
                      setShowEdit(false);
                      setEditData(null);
                    }}
                  >
                    Cancelar Edição
                  </button>
                </form>
              </div>
            )}
            {message && <Message type="success" msg={message} />}

          </>
        )}
      </div>
      <div className={styles.userPhotos}>
        <h2>Fotos publicadas:</h2>
        <div className={styles.photoContainer}>
          {photos && photos.length !== 0 && photos.map((photo) => (
            <Photo
              photo={photo}
              key={photo._id}
              userId={userAuth._id}
              editToggler={setShowEdit}
              editData={setEditData}
            />
          ))}
        </div>

      </div>
    </>
  )
}

export default Profile