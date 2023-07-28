import styles from "./Navbar.module.css";

import { NavLink, Link } from "react-router-dom";

// Icons

import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill
} from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"

// External Hooks

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, reset } from "../../slices/authSlice";
import { useState } from "react";
import { setInputValue } from "../../utils/utilities";


const Navbar = () => {
  const { user } = useSelector(store => store.auth);

  const [query, setQuery] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login")
  }

  function handleSearchSubmit(e) {
    e.preventDefault();

    if (query) {
      navigate(`/search?q=${query}`)
      setQuery("");
    }
  }



  return (
    <header className={styles.navbar}>
      <Link to="/">ReactGram</Link>
      <form
        className={styles.searchForm}
        onSubmit={handleSearchSubmit}
      >
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={setInputValue(setQuery)}

        />
      </form>

      <nav className={styles.navLinks}>
        {user ? (
          <>
            <NavLink to="/">
              <BsHouseDoorFill />
            </NavLink>

            <NavLink to={`/users/${user._id}`}>
              <BsFillCameraFill />
            </NavLink>

            <NavLink to="/profile">
              <BsFillPersonFill />
            </NavLink>
            <span onClick={handleLogout}><FiLogOut /></span>
          </>
        ) : (
          <>
            <NavLink to="/login">
              Entrar
            </NavLink>
            <NavLink to="/register">
              Cadastrar
            </NavLink>
          </>
        )}
      </nav>

    </header>
  )
}

export default Navbar