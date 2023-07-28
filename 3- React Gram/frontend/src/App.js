import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages

import Home from "./pages/Home/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import PhotoDetails from "./pages/PhotoDetails/PhotoDetails"

// Components

import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";

// Hooks

import { useAuth } from "./hooks/useAuth";
import { useSelector } from 'react-redux';
import Search from './pages/Search/Search';

function App() {

  const { loading } = useAuth();
  const { user } = useSelector(store => store.auth);

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/photos/:id"
              element={user ? <PhotoDetails />: <Navigate to="/login" />}
            />
            <Route
              path="/search"
              element={user ? <Search />: <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
