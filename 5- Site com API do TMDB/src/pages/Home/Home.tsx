import React, { useEffect, useState } from 'react'
import MovieCard from '../../components/MovieCard/MovieCard';
import { useFetch } from '../../hooks/useFetch'
import { Movie } from '../../hooks/useFetch';

import "./Home.scss";

type Props = {}

function Home({}: Props) {

  const {getMovies} = useFetch();
  const [movieList, setMovieList] = useState<Array<Movie>>([]);

  useEffect(()=> {

    getMovies()
      .then(data => setMovieList(data))
      .catch(err => console.log(err));
  },[])
  return (
    <section className="home">
      <h2 className="home__title">Melhores Filmes:</h2>
      <div className="movie-container">
        {movieList 
        && movieList.length !== 0 
        && movieList.map((item)=> (
          <MovieCard movie={item} key={item.id}/>
        ))}
      </div>
    </section>
  )
}

export default Home