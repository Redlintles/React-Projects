import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useDate } from '../../hooks/useDate';


// Components

import Comments from '../../components/Comments';
import TagsContainer from '../../components/TagsContainer';


const ComponentStyle = styled.div`
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;

  h2 {
    margin-bottom: 2rem;
    align-self: center;
    text-align: center;
  }

  img {
    width: 100%;
  }

  .post__data {
    margin: 0 0 .5rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem 0;
    background-color: #eee;
    padding: .5rem;
    
    & > span {
      font-size: .8rem;
      font-weight: bold;
      color: #444;


      &:last-child {
        text-align: right;
      }
    }
  }

  .post-content {
    padding: 0 1rem;
    & > p:first-child {
      font-size: .9rem;
      color: #222;
      font-weight: 600;
      margin-bottom: 1rem;

      &::before,
      &::after {
        content: '"';
        font-size: 1.2rem;
      }
    }
  }

  @media(min-width: 1200px) {
    .post__data {
      justify-content: space-between;
      flex-direction: row;
      gap: 0;
    }

    h2 {
      text-align: left;
    }

    .post-content {
      padding: 1rem 0;
    }
  }
`;

const ShowPost = () => {

  const { id } = useParams();

  const formatDate = useDate()


  const { document: post, loading } = useFetchDocument("posts", id);




  return (
    <ComponentStyle>
      {post && (
        <>
          <div>
            <h2>{post.title}</h2>
            <img src={post.image} alt="" />
            <div className="post__data">
              <span>Autor(a): {post.createdBy}</span>
              <span>Data da Postagem: {formatDate(post.createdAt)}</span>
            </div>
            <div className="post-content">
              <p>{post.body}</p>
              <TagsContainer post={post} />
              {loading && <p>Carregando...</p>}
            </div>
          </div>
          <Comments author={post.createdBy} />
        </>
      )}
    </ComponentStyle>
  )
}

export default ShowPost