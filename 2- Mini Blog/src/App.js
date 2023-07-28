import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';


// Pages

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search';
import ShowPost from "./pages/ShowPost/ShowPost";
import Dashboard from './pages/Dashboard/Dashboard';
import Edit from "./pages/Edit/Edit";

// Components

import Navbar from './components/Navbar';
import Footer from "./components/Footer";


// Context

import { AuthProvider } from './context/AuthContext';


function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>
  }


  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home />}
              >
              </Route>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              >
              </Route>
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              >
              </Route>
              <Route
                path="/posts/createpost"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              >
              </Route>
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              >
              </Route>
              <Route
                path="/about"
                element={<About />}
              >
              </Route>
              <Route
                path="/search"
                element={<Search />}
              >
              </Route>
              <Route
                path="/posts/:id"
                element={<ShowPost />}
              >
              </Route>
              <Route
                path="/posts/edit/:id"
                element={<Edit />}
              >
              </Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
