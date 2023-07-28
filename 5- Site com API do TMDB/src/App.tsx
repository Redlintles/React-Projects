import './App.scss';
import {useEffect, useState} from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useFetch } from './hooks/useFetch';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Search from './pages/Search/Search';

function App() {

  const {getMovies} = useFetch();

  useEffect(()=> {

    getMovies()
      .then(data => console.log(data[0]))

  },[])

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />}/>
            <Route path="/search" element={<Search />}/>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
