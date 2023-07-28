import React from 'react'
import { useQuery } from '../../hooks/useQuery';
import Post from '../../components/Post';

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;


`

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 2rem;

`

const Search = () => {

  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);


  return (
    <StyledMain>
      <div>
        {posts && posts.length === 0 && (
          <NoResults>
            <p>Não foram encontradas posts a partir da sua busca...</p>
            <Link to="/" className="btn btn--dark">Voltar</Link>

          </NoResults>
        )}

        {posts && posts.length !== 0 && (
          <div>
            <h2>Aqui estão os resultados da sua busca!</h2>
            <div className="posts-container">
              {posts.map((post) => (
                <Post key={post.id} post={post}></Post>
              ))}
            </div>
          </div>
        )}
      </div>
    </StyledMain>
  )
}

export default Search