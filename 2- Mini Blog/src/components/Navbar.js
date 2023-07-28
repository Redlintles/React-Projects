import { useRef } from "react";
import { NavLink } from "react-router-dom"
import styled from "styled-components"

import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";

const AbstractButton = styled.button`
  border: none;
  padding .5rem 1rem;
  cursor: pointer;
  outline: none;
  margin: 0;
`

const StyledHeader = styled.header`
  display: flex;
  box-shadow: rgba(0,0,0,.15) 0px -2px 10px 0px;
  justify-content: space-between;
  align-items: center;
  padding: .5rem 1rem;
  position: relative;
  margin-bottom: 5rem;

  .brand {
    font-size: 1.2em;
  }

  .brand > span {
    font-weight: 900;
    text-transform: uppercase;
  }

  nav {
    display: flex;
    width: 100%;
    gap: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: transform .5s ease, opacity .5s ease, visibility .5s ease;
    justify-content: center;
    position: absolute;
    top: 100%;
    left: 0;

    a {
      padding: .5rem 0;
    }

   .active {
    color: #fff;
    background-color: #000;
    }

    &.navbar--visible {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }

  .burger-menu {
    font-size: 1.2rem;
    color: #777;
  }

  @media(min-width: 1200px) {
    padding: .5em 2em;
    margin-bottom: 0;

    .burger-menu {
      display: none;
    }

    nav {
      width: auto;
      opacity: 1;
      transform: unset;
      visibility: visible;
      position: static;

      a {
        padding: .4em .6em;
      }
    }
  }

`

const Navbar = () => {

  const { user } = useAuthValue();

  const { logout } = useAuthentication();

  const navRef = useRef();


  function toggleNavbar(e) {
    console.log(navRef.current);
    navRef.current.classList.toggle("navbar--visible");
  }


  return (
    <StyledHeader>
      <NavLink to="/" className="brand">Mini <span>Blog</span></NavLink>
      <AbstractButton 
        className="burger-menu"
        onClick={toggleNavbar}
      >
        <i className="fas fa-bars"></i>
      </AbstractButton>
      <nav ref={navRef}>
        <NavLink to="/">
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/login">
              Entrar
            </NavLink>
            <NavLink to="/register">
              Cadastrar
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/posts/createpost">
              Criar Post
            </NavLink>
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
          </>
        )}
        <NavLink to="/about">
          Sobre
        </NavLink>
        {user && (
          <>
            <button onClick={() => {
              logout();
            }}>
              Sair
            </button>
          </>
        )}
      </nav>
    </StyledHeader >
  )
}

export default Navbar