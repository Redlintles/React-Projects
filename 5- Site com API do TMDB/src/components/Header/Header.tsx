import { BiCameraMovie, BiSearch } from "react-icons/bi";
import { FormEvent, useState } from "react";
import {useNavigate, Link} from "react-router-dom";

import "./Header.scss";

type Props = {}

function Header({ }: Props) {

  const [query,setQuery] = useState<string>("");
  const navigate = useNavigate();

  function handleSearch(e: FormEvent):void {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    setQuery("");
  }

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <h1>
        <Link to="/">
        
        <BiCameraMovie /> MoviesLib
        </Link>
        </h1>
      </div>
      <div className="navbar__search">
        <form onSubmit={handleSearch}>
          <input 
            type="text"
            placeholder="Digite Algo..."
            name="query"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <button type="submit" className="btn">
            <BiSearch />
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header