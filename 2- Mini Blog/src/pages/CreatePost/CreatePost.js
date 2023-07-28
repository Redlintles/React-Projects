import React from 'react'

import { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';

import { useInsertDocument } from "../../hooks/useInsertDocument"

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {insertDocument, response} = useInsertDocument("posts");

  const {user} = useAuthValue();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    console.log("form submit");

    try {
      new URL(image)
    } catch(error) {
      setFormError("A imagem precisa ser uma URL")
    }

    const tagsArr = tags.split(",").map((tag)=> {return tag.trim().toLowerCase()});

    if(!formError) {
      insertDocument({
        title,
        image,
        body,
        tagsArr,
        uid: user.uid,
        createdBy: user.displayName
      })
    }

    navigate("/");
  }

  function setInputState(setter) {
    return (e) => { setter(e.target.value) };
  }


  return (
    <div className="form-container">
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe suas experiências!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={setInputState(setTitle)}
            placeholder="Digite o Título do post"
          />
        </label>

        <label>
          <span>Imagem:</span>
          <input
            type="text"
            name="image"
            required
            value={image}
            onChange={setInputState(setImage)}
            placeholder="Insira a URL da imagem..."
          />
        </label>

        <label>
          <span>Conteúdo do post:</span>
          <textarea
            name="body"
            required
            value={body}
            onChange={setInputState(setBody)}
            placeholder="Digite o seu post..."
          >

          </textarea>
        </label>

        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            value={tags}
            onChange={setInputState(setTags)}
            placeholder="Insira as tags separadas por ,"
          />
        </label>


        
          {!response.loading && <button type="submit" className="btn">Criar Post</button>}

          {response.loading && <button type="submit" className="btn" disabled>Aguarde</button>}

          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost