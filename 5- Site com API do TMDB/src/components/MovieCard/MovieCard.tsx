import { BsFillStarFill } from "react-icons/bs";

import { Link } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';

import "./MovieCard.scss";

interface Movie {
  title: string
  id: number
  vote_average: number
  poster_path: string
}

type Props = {
  movie: Movie
}

function MovieCard({ movie }: Props) {

  const { getMovieImg } = useFetch();

  return (
    <article className="movie-card">
      <img
        src={getMovieImg(movie.poster_path)}
        alt={movie.title}
        className="card__poster"
      />
      <div className="card__info">
        <h3 className="card__title">{movie.title}</h3>
        <span className="card__score">
          <BsFillStarFill />
          {(movie.vote_average/2).toFixed(1)}
        </span>
        <Link
          to={`/movie/${movie.id}`}
          className="btn"
        >
          Detalhes
        </Link>
      </div>

    </article>
  )
}

export default MovieCard