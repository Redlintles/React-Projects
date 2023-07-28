import React, { useState } from 'react'


import { useRef } from 'react';



import ResponseForm from './ResponseForm';
import { useAuthValue } from '../context/AuthContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../FB/config';
import { useDate } from "../hooks/useDate";
import { useDeleteDocument } from "../hooks/useDeleteDocument"
import styled from 'styled-components';

import EditForm from "./EditForm";
import OperationsMenu from './OperationsMenu';

const CommentStyle = styled.div`
  .comment {
    display: flex;
    flex-direction: column;
    padding: 0 1rem;

    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: .5rem;

      .header__left {
        display: flex;
        flex-direction: column;

        & > div {
          display: flex;
          flex-direction: column;
        }

        span {
          font-size: .8rem;
          color: #aaa;
        }
      }

    }
    &__body {
      padding: 1rem .5rem;
      border-bottom: 1px solid #ccc;

      p {
        font-size: .85rem;
      }
    }
    &__responses {
      padding-left: 1rem;
      margin: 1rem 0;

      .comment {
        padding: 0;
      }
    }
  }

  @media(min-width: 1200px) {
    .comment {
      padding: 0;

      &__responses {
        padding-left: 2rem;
      }
    }
  }


`

let commentId = 0;

const Comment = ({ data, type, comment }) => {

  const { deleteDocument } = useDeleteDocument("comments");
  const { user } = useAuthValue();
  const formatDate = useDate();
  const [showEdit, setShowEdit] = useState(false);

  async function deleteComment(comment) {
    await deleteDocument(comment.id);
  }

  async function deleteRes(comment, id) {
    console.log(comment, id)
    const data = {
      ...comment,
      responses: comment.responses.filter((res) => res.id !== id)
    }

    await updateDoc(doc(db, "comments", comment.id), data);

  }

  return (
    <CommentStyle>
      {data && (
        <div className="comment">
          <div className="comment__header">
            <div className="header__left">
              <h5>{data.author}</h5>
              {!showEdit && (
                <div>
                  <span>Criado em: {formatDate(data.createdAt)}</span>
                </div>
              )}
            </div>
            {type !== "response" && (
              <OperationsMenu
                deleteFn={() => { deleteComment(data) }}
                editFn={() => { setShowEdit(!showEdit) }}
              />
            )}
            {type === "response" && (
              <OperationsMenu
                deleteFn={() => { deleteRes(comment, data.id) }}
                editFn={() => { setShowEdit(!showEdit) }}
              />
            )}
          </div>
          <div className="comment__body">
            {!showEdit && <p>{data.comment}</p>}
            {showEdit && type !== "response" && (
              <EditForm
                data={data}
                toggler={setShowEdit}

              />
            )}

            {showEdit && type === "response" && (
              <EditForm
                data={comment}
                toggler={setShowEdit}
                type="response"
                response={data}
              />
            )}
          </div>
          {data.responses && (
            <div className="comment__responses">
              <ResponseForm
                post={data}
                author={user.displayName}
                length={0}


              />
              {data.responses && data.responses.map((res) => (
                <>
                  <Comment data={res} key={res.id} type="response" comment={data}></Comment>

                </>
              ))}
            </div>
          )}
        </div>
      )}
    </CommentStyle>
  )
}

export default Comment