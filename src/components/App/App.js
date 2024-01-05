import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  // const path = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error);
  }

  function handleLogin({ email, password }) {
    return mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        mainApi.getSaveMovies().then((movies) => {
          setIsLoggedIn(true);
          setMovies(movies);
          navigate("/movies");
        });
      })
      .catch(console.error);
  }

  // проверяем наличие токена авторизации

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     setIsLoggedIn(true);
  //     navigate(path);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [navigate, path]);

  useEffect(() => {
    const path = location.pathname;
    function handleCheckToken() {
      const jwt = localStorage.getItem("jwt");

      if (jwt) {
        mainApi
        .checkToken(jwt)
          .then((res) => {
            if (res) {
              setIsLoggedIn(true);
              setCurrentUser(res.user);
              console.log(setCurrentUser(res.user));
              navigate(path);
            } else {
              setIsLoggedIn(false);
            }
          })
          .catch(console.error);
      }
    }
    handleCheckToken();
  }, [navigate]);


  // проверяем наличие токена у пользователя
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Promise.all([mainApi.getUserInfo(jwt), mainApi.getSaveMovies(jwt)])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSaveMovies(movies);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={isLoggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Movies loggedIn={isLoggedIn} movies={movies} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies loggedIn={isLoggedIn} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile loggedIn={isLoggedIn} onSignOut={handleSignOut} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <Register onRegister={handleRegister} isLoading={isLoading} />
            }
          />
          <Route
            path="/signin"
            loggedIn={isLoggedIn}
            element={<Login onLogin={handleLogin} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
