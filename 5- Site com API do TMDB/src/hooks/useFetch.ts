import axios from "axios";

const baseURL: string = "https://api.themoviedb.org/3/";
const ImgURL: string = "https://image.tmdb.org/t/p/w500";
const searchURL: string = "https://api.themoviedb.org/3/search";

export interface Movie {
  title: string
  poster_path: string
  vote_average: number
  budget: number
  revenue: number
  runtime: number
  overview: string
  id: number
}

export function useFetch() {

  const getMoviesInstance = axios.create({
    baseURL: baseURL + "discover/movie",
    params: {
      api_key: "cd8330eef81acf0a6d80563f53881dd5",
      language: "pt-BR"
    }

  })
  const getMovieInstance = axios.create({
    baseURL: baseURL + "movie/",
  })
  const searchMoviesInstance = axios.create({
    baseURL: searchURL
  })

  async function getMovies():Promise<Array<Movie>> {
    const { data } = await getMoviesInstance.get("/", {});
    return data.results
  }

  async function getMovie(movieId: string):Promise<Movie> {
    const data = await getMovieInstance.get(`${movieId}`, {
      params: {
        api_key: "cd8330eef81acf0a6d80563f53881dd5",
        language: "pt-BR"
      }
    });

    return data.data;
  }

  async function searchMovies(keyword: string): Promise<Array<Movie>> {
    const { data } = await searchMoviesInstance.get("/movie", {
      params: {
        api_key: "cd8330eef81acf0a6d80563f53881dd5",
        language: "pt-BR",
        query: keyword
      }
    });

    return data.results
  }

  function getMovieImg(path: string):string {

    const src: string = ImgURL+path;
    return src;
  }

  return { getMovies, getMovie, searchMovies, getMovieImg };
}
