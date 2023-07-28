import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import React, { useState, useRef } from 'react'


import { useAuthValue } from '../context/AuthContext';
import { useInsertDocument } from '../hooks/useInsertDocument';
import { useEditDocument } from "../hooks/useEditDocument";

import { useParams } from 'react-router-dom';

import { db } from '../FB/config';
import styled from 'styled-components';


const FormStyle = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 0;
  width: 100% !important;
  max-width: unset;
  gap: .5rem;


  & > h5 {
    width: 100%;
    text-align: left;
  }

  & > textarea {
    width: 100%;
    border: 1px solid #777;
    padding: .5rem 1rem;
    resize: none;
    height: 150px;
    font-size: .9rem;
  }

`

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 1rem 0;
  width: 100%;
  max-width: unset;
  margin-bottom: 3rem;

  & > h5 {
    font-size: 1rem;
    order: 2;
  }

  @media(min-width: 1200px) {
    flex-direction: row;
    gap: 0;
    margin-bottom: 1rem;

    h5 {
      order: 0;
    }
  }


`


const ResponseForm = ({ post, commentId, length }) => {

  const [comment, setComment] = useState();
  const { user } = useAuthValue();
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);

  function toggler() {
    setShowForm(!showForm);
  }



  const { insertDocument } = useInsertDocument("comments", true);



  async function handleUpdate(e) {
    e.preventDefault();

    const data = {
      ...post,
      responses: [
        {
          author: user.displayName,
          comment,
          userID: user.uid,
          createdAt: Timestamp.now(),
          id: post.responses.length + 1
        },
        ...post.responses,

      ]
    }


    setComment("");
    toggler();

    await updateDoc(doc(db, "comments", `${post.id}`), data)




  }

  async function handleInsert(e) {
    e.preventDefault();

    const data = {
      postId: id,
      id: `${id}-${commentId + 1}`,
      author: user.displayName,
      comment,
      responses: [],
    }

    setComment("");
    toggler();
    await insertDocument(data);


  }



  return (
    <>
      <FormHeader>
        {post && (
          <>
            <h5>Respostas para este comentário({post.responses.length}):</h5>
            {!showForm && user && (
              <button
                onClick={toggler}
                className="btn btn--outline"
              >
                Responder
              </button>
            )}
          </>
        )}
        {!post && (
          <>
            <h5>Comentários({length}):</h5>
            {!showForm && user && (
              <button
                onClick={toggler}
                className="btn btn--dark"
              >
                Criar novo comentário
              </button>
            )}

          </>
        )}
      </FormHeader>

      {showForm && (
        <>
          <FormStyle
            onSubmit={post ? handleUpdate : handleInsert}

          >
            <h5>{user.author}</h5>
            <textarea
              name="comment"
              value={comment}
              onChange={(e) => { setComment(e.target.value) }}

            >

            </textarea>

            <button
              className="btn btn--outline"
              onClick={toggler}

            >
              Cancelar
            </button>

            <button
              className="btn btn--dark"
            >
              Enviar
            </button>

          </FormStyle>

        </>
      )}




    </>
  )
}

export default ResponseForm