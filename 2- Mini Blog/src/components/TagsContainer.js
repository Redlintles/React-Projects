import React from 'react'
import styled from 'styled-components';


const ComponentStyle = styled.div`
  
  margin-bottom: 1.2rem;

  & > h5 {
    margin-bottom: 1rem;
  }


  & > .tags-container {
    display: flex;
    flex-wrap: wrap;
    

    & > p {
      margin-right: .5rem;
      font-weight: 600;

      & > span {
        font-weight: bold;
        font-size: 1.2rem;
  
      }
    }

  }
  
`;

const TagsContainer = ({ post }) => {
  return (
    <ComponentStyle>
      <h5>Este post trata sobre:</h5>
      <div className="tags-container">
        {post.tagsArr.map((tag) => (
          <p key={tag}><span>#</span>{tag}</p>
        ))}
      </div>
    </ComponentStyle>
  )
}

export default TagsContainer