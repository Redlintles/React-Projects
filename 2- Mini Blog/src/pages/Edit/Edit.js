import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';

import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useEditDocument } from "../../hooks/useEditDocument";
import styled from 'styled-components';


const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  & > p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #444;
    font-weight: bold;
  }

  & > img {
    max-width: 600px;
  }


`



const Edit = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("")

  const { id } = useParams();

  const { document: post } = useFetchDocument("posts", id);

  const { edit } = useEditDocument("posts");
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      setTags(post.tagsArr.join(","))

    }

  }, [post])

  function setInputState(setter) {
    return (e) => { setter(e.target.value) };
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const tagsArr = tags.split(",").map((tag) => { return tag.trim().toLowerCase() });

    const data = {
      title,
      image,
      body,
      tagsArr
    }

    await edit(data, id);

    navigate("/");

  }


  return (
    <>
      {post && (
        <div className="form-container">
          <h2>Editando Post: {post.title}</h2>
          <p>Realize alguma alteração no seu post!</p>
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

            <ImagePreview>
              <p>Preview da imagem atual:</p>
              <img src={image} alt="A Imagem não pode ser exibida" />
            </ImagePreview>

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

            <button type="submit" className="btn">Editar Post</button>
          </form>
        </div>
      )}
    </>
  )
}

export default Edit