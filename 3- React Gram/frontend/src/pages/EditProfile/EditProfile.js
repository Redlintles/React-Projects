import styles from "./EditProfile.module.css";

import ShowAndHidePassword from "../../components/ShowAndHidePassword/ShowAndHidePassword";
import FormFeedback from "../../components/FormFeedback/FormFeedback";
import Message from "../../components/Message/Message";

// Hooks

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux

import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components


import { setInputValue } from "../../utils/utilities";
import {upload} from "../../utils/config";

const EditProfile = () => {

  const {
    user,
    message,
    error,
    loading
  } = useSelector(store => store.user);

  const dispatch = useDispatch();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");


  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);

    }
  }, [user])

  useEffect(() => {
    dispatch(profile())
  }, [dispatch])


  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      name
    }

    if(profileImage) {
      userData.profileImage = profileImage;
    }

    if(bio) {
      userData.bio = bio;
    }

    if(password) {
      userData.password = password;
    }

    const formData = new FormData();

    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key])
    });

    await dispatch(updateProfile(formData))

    setTimeout(()=> {
      dispatch(resetMessage())
    },2000)
  }

  function handleFile(e) {
    const image = e.target.files[0];
    setPreviewImage(image);
    setProfileImage(image);
  }


  return (
    <div className={styles.mainContainer}>
      <h2>Edite seus dados</h2>
      <p
        className={styles.subtitle}
      >
        Adicione uma imagem de perfil e conte mais sobre você
      </p>
      {/* preview da imagem */}
      {(user.profileImage || previewImage) && (
        <div className={styles.previewImg}>
          <img
            className={styles.profileImage}
            src={
              previewImage
                ? URL.createObjectURL(previewImage)
                : `${upload}/users/${user.profileImage}`
            }
            alt={user.name}
          />


        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            placeholder="Nome"
            value={name || ""}
            onChange={setInputValue(setName)}
          />
        </label>
        <label>
          <span>Email(apenas leitura):</span>
          <input
            type="email"
            placeholder="E-mail"
            disabled
            value={email || ""}
          />
        </label>
        <label>
          <span>Imagem do Perfil:</span>
          <input
            type="file"
            onChange={handleFile}
          />
        </label>

        <label>
          <span>Bio:</span>
          <textarea
            placeholder="Descrição do perfil"
            value={bio}
            onChange={setInputValue(setBio)}
          >

          </textarea>
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <ShowAndHidePassword
            placeholder="Digite sua nova senha..."
            setter={setPassword}
          />
        </label>
        <FormFeedback />
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  )
}

export default EditProfile