import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom";
import styled from "styled-components";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useDate } from "../../hooks/useDate";


const ComponentStyle = styled.main`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  max-width: 600px;

  & > :is(h2,p) {
    margin-bottom: 1rem;
    text-align: center;
  }

  & > p {
    color: #888;
  }


  & > .noposts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .post-container {
    &__top {
      display: none;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: .5rem;
      border-bottom: 1px solid #888;
    }
    &__posts {
      display: flex;
      flex-direction: column;
      padding: 0 2rem;

    }
    &__post {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      gap: 2rem 0;
      padding: 1rem;
      border: 1px solid #444;
      margin-bottom: .5rem;
      align-items: center;
      background-color: transparent;
      transition: background-color .5s ease;

      &:hover {
        background-color: #efefef;
      }

      .post__left {
        display: flex;
        flex-direction: column;

        & > h5 {
          margin-bottom: 1rem;
        }

        & > div {
          display: flex;
          flex-direction: column;
          gap: .5rem;
          font-size: .75rem;
          color: #444;
        }
      }

      .post__right {
        display: flex;
        gap: .5rem;

        & > .btn {
          margin: 0;
        }
      }
    }
  }

  @media(min-width: 1200px) {

    .post-container__top {
      display: flex;
    }
    .post-container__posts {
      padding: 0;
    }
    .post-container__post {
      flex-direction: row;
      gap: 0;
    }
  }


`;

let dateArr = [];

const Dashboard = () => {

  const formatDate = useDate();

  const { user } = useAuthValue();

  const [posts, setPosts] = useState([]);

  const { documents } = useFetchDocuments("posts", null, user.uid);

  const { deleteDocument } = useDeleteDocument("posts");


  useEffect(() => {
    if (documents) {
      dateArr = documents.map((doc) => {

        const fulldate = formatDate(doc.createdAt);

        return fulldate;
      })

      setPosts(documents);
    }
  }, [documents,formatDate])


  return (
    <ComponentStyle>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts aqui</p>
      {posts && posts.length === 0 ? (
        <div className="noposts">
          <p>Não tem Posts</p>
          <Link to="/posts/create" className="btn">Criar Primeiro Post</Link>
        </div>
      ) : (
        <div>
          <div className="post-container">

            <div className="post-container__top">
              <h4>Título</h4>
              <h4>Ações</h4>
            </div>
            <div className="post-container__posts">
              {posts && posts.map((post, i) => (
                <div className="post-container__post" key={i}>
                  <div className="post__left">
                    <h5>{post.title}</h5>
                    <div>
                      <p>Criado em: {dateArr[i]}</p>
                      {post.lastEdit && (
                        <p>Editado em: {formatDate(post.lastEdit)}</p>
                      )}
                    </div>
                  </div>
                  <div className="post__right">
                    <Link to={`/posts/${post.id}`} className="btn btn--outline">Ler</Link>
                    <Link to={`/posts/edit/${post.id}`} className="btn btn--outline">Editar</Link>
                    <button className="btn btn--outline btn--danger" onClick={() => { deleteDocument(post.id) }}>Excluir</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ComponentStyle>
  )
}

export default Dashboard