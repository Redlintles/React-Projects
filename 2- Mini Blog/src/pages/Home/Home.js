import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Post from "../../components/Post";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

const StyledMain = styled.main`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;


  & > h1 {
    margin-bottom: 2rem;
    text-align: center;
  }


  & > form {
    max-width: 100%;
    display: flex;
    width: 80vw;
    justify-content: center;
    margin-bottom: 2rem;
    align-items: center;

    & > input {
      width: 80%;
      padding-left: 1rem;
    }

    & > * {
      border: 1px solid #444;
    }
    & > button {
      margin: 0;
      flex-grow: 1;
    }
  }

  .noposts {
    text-align: center;

    & > p {
      margin-bottom: 1.5rem;
    }

    & > a {
      padding: 10px 25px;
    }
  }

  @media(min-width: 1200px) {
    & > form {
      width: 40%;
    }
  }
`;


const Home = () => {
  const [query, setQuery] = useState();
  const [posts, setPosts] = useState(null);
  const navigate = useNavigate();


  const { documents } = useFetchDocuments("posts");

  useEffect(() => {
    if (documents) {
      setPosts(documents)
    }
  }, [documents])

  function setInputState(setter) {
    const fn = (e) => { setter(e.target.value) }
    return fn;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <StyledMain>
      <h1>Veja os nossos posts mais recentes</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          onChange={setInputState(setQuery)}
          placeholder="Ou busque por tags"
        />
        <button className="btn btn--dark">Pesquisar</button>
      </form>
      <div>
        {posts && posts.length === 0 && (
          <>
            <h1>Posts...</h1>
            <div className="noposts">
              <p>Não foram encontrados posts</p>
              <Link to="posts/create" className="btn">Criar Primeiro Post</Link>
            </div>
          </>
        )}
        {posts && posts.map((post, i) => (
          <Post post={post} key={i}></Post>
        ))}
      </div>
    </StyledMain>
  )
}

export default Home