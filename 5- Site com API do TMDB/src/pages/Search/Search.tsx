import React, { useEffect, useState } from 'react'

import { useSearchParams } from "react-router-dom";
import { useFetch, Movie } from '../../hooks/useFetch';

import "./Search.scss";
import MovieCard from '../../components/MovieCard/MovieCard';

type Props = {}

function Search({ }: Props) {

  const [searchParams] = useSearchParams();
  const query: string | null = searchParams.get("query");

  const { searchMovies } = useFetch();
  const [movies, setMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    if (query) {
      searchMovies(query)
        .then(data => setMovies(data))
        .catch(err => console.log(err));
    }
  }, [searchParams])

  return (
    <section className ="search">
      {movies && (
        <>
          <h2 className={"search__title"}>Resultados para: "{query}"</h2>
          <div className="movie-container">
            {movies.map((movie: any) => (
              <>
                <MovieCard movie={movie} />
              </>
            ))}
          </div>
        </>
      )}
      {!movies && (
        <p>Não foram encontrados resultados para "{query}"</p>
      )}

    </section>
  )
}

export default Search