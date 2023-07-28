import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import TagsContainer from './TagsContainer';


const PostStyles = styled.div`
  margin-bottom: 2rem;

  & > img {
    width: 100vw;
  }

  .post-content {
    padding: 1rem;
    max-width: 100vw;

    & > h2 {
      margin-bottom: .4rem;
    }
  
    & > p {
      font-style: italic;
      color: #44;
      font-size: .8rem;
      margin-bottom: 1rem;
    }
  }

}
  @media(min-width: 1200px) {
    width: auto;

    .post-content {
      padding: 1rem 0;
      max-width: unset;
    }

    img {
      max-width: 600px;
    }

`;


const Post = ({ post }) => {

  if (!post) {
    return;
  }
  return (
    <PostStyles>
      <img src={post.image} alt={post.title} />
      <div className="post-content">
        <h2>{post.title}</h2>
        <p>{post.createdBy}</p>

        <TagsContainer post={post}>
        </TagsContainer>

        <Link to={`/posts/${post.id}`} className="btn btn--outline">Ler</Link>
      </div>
    </PostStyles>
  )
}

export default Post