import { doc, updateDoc, Timestamp } from 'firebase/firestore'
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { db } from '../FB/config'

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

const EditForm = ({ data, type, response, toggler}) => {


  const [comment, setComment] = useState();


  console.log(type)
  useEffect(() => {

    if (type === "response" && response) {
      setComment(response.comment);
    } else if (data) {
      setComment(data.comment);

    }

  }, [data])



  async function handleCommentUpdate(e) {
    e.preventDefault();
    const updatedComment = {
      ...data,
      comment
    }
    await updateDoc(doc(db, "comments", data.id), updatedComment);
    toggler()
  }

  async function handleResponseUpdate(e) {
    e.preventDefault();


    let toEdit = data.responses[data.responses.indexOf(response)];
    toEdit.comment = comment;
    toEdit.editedAt = Timestamp.now();

    let newResponses = data.responses.map((res) => {
      if (res.id === toEdit.id) {
        return toEdit
      } else {
        return res
      }
    })

    const updatedRes = {
      ...data,
      responses: newResponses

    }

    await updateDoc(doc(db, "comments", data.id), updatedRes);

    toggler();
  }





  return (
    <div>
      {data && (
        <FormStyle
          onSubmit={type === "response" ? handleResponseUpdate : handleCommentUpdate}
        >
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => { setComment(e.target.value) }}

          ></textarea>

          <button
            type="button"
            className="btn btn--outline"
            onClick={()=> {toggler(false)}}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn btn--dark"
          >
            Enviar
          </button>
        </FormStyle>)}
    </div>
  )
}

export default EditForm