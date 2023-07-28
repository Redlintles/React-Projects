import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useFetch } from '../../hooks/useFetch';

import { FaChartLine, FaStar } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { BiMovie } from "react-icons/bi";
import { GrDocumentText } from "react-icons/gr";
import { Movie } from '../../hooks/useFetch';

import "./MovieDetails.scss";

function MovieDetails() {
  const { id } = useParams();
  const { getMovie, getMovieImg } = useFetch();

  const [movie, setMovie] = useState<Movie>({
    poster_path: "",
    title: "",
    budget: 0,
    overview: "",
    vote_average: 0,
    revenue: 0,
    runtime: 0,
    id: 0
  });

  useEffect(() => {

    if (id) {
      getMovie(id)
        .then((data) => { setMovie(data) })
        .catch(err => console.log(err));
    }

  }, [])

  function formatMoney(money: number) {
    const n: any = money.toString();
    let inverted: string = "";
    let formatted: string = "";

    for (let i = n.length-1; i>=0; i--) {
      inverted += n[i];
      if ((i + 1) % 3 === 0 && i !== n.length-1) {
        inverted += "_"
      }
    }
    inverted = inverted.split("_").join(".");

    for(let i= inverted.length-1; i>=0; i--) {
      formatted+= inverted[i];
    }

    return formatted;
  }

  return (
    <section className="movie-section">

      {movie && (
        <article className="movie">
          <div className="movie__meta">
            <img src={getMovieImg(movie.poster_path)} alt="" />
            <h2>{movie.title}</h2>
            <p className="movie__score">
              <FaStar />
              {(movie.vote_average / 2).toFixed(1)}
            </p>
            <p>Uma oferta Irrecusável</p>
          </div>
          <div className="movie-info">
            <article className="movie-info__unity">
              <h5>
                <BiMovie />
                Orçamento:
              </h5>
              <p>
                ${formatMoney(movie.budget)}
              </p>
            </article>
            <article className="movie-info__unity">
              <h5>
                <FaChartLine />
                Receita:
              </h5>
              <p>
                ${formatMoney(movie.revenue)}
              </p>
            </article>
            <article className="movie-info__unity">
              <h5>
                <GiSandsOfTime />
                Duração:
              </h5>
              <p>
                {movie.runtime}
                Minutos
              </p>
            </article>
            <article className="movie-info__unity">
              <h5>
                <GrDocumentText />
                Descrição:
              </h5>
              <p>
                {movie.overview}
              </p>
            </article>

          </div>
        </article>
      )}
    </section>
  )
}

export default MovieDetails