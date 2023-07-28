import React, { useEffect, useState} from 'react'
import styled from 'styled-components';

import { useFetchComments } from "../hooks/useFetchComments";

import { useParams } from 'react-router-dom';

import ResponseForm from './ResponseForm';
import { useAuthValue } from '../context/AuthContext';
import Comment from './Comment';

const ComponentStyle = styled.section`
  .btn {
    margin-bottom: 0;
  }

  .new-comment {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

`

let commentId = 0;


const Comments = () => {

  const [comments, setComments] = useState();
  const [commentNumber, setCommentNumber] = useState();
  const { id } = useParams();
  const { user } = useAuthValue();
  const { documents } = useFetchComments("comments", id);

  useEffect(() => {

    if (documents) {
      setComments(documents);
      commentId = documents.length;
      setCommentNumber(documents.length);
    }

  }, [documents])


  return (
    <ComponentStyle>
      <div className="new-comment">
        <ResponseForm
          commentId={commentId}
          length={commentNumber}
        />
      </div>
      <div className="comments-section">
        {comments && comments.map((comment) => (
          <Comment data={comment} key={comment.id} />
        ))}
      </div>
    </ComponentStyle>
  )
}

export default Comments