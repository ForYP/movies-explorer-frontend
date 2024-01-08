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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [userMessageError, setUserMessageError] = useState("");

  /* РЕГИСТРАЦИЯ */

  function handleRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((error) => {
        console.log(error);
        setUserMessageError("Что-то пошло не так...");
        setTimeout(() => {
          setUserMessageError("");
        }, 2000);
      });
  }

  /* ВХОД */

  function handleLogin({ email, password }) {
    return mainApi
      .login(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        Promise.all([
          mainApi.checkToken(token),
          mainApi.getSaveMovies(token),
        ]).then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
          setIsLoggedIn(true);
          navigate("/movies");
        });
      })
      .catch((error) => {
        console.log(error);
        setUserMessageError("Неправильные почта или пароль");
        setTimeout(() => {
          setUserMessageError("");
        }, 2000);
      });
  }

  /* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */

  function handleUpdateUser(newUserInfo) {
    const jwt = localStorage.getItem("jwt");
    setIsLoading(true);
    mainApi
      .setUserInfo(newUserInfo, jwt)
      .then((user) => {
        setCurrentUser(user);
        setUserMessage("Профиль отредактирован успешно");
        setUserMessageError("");
        setTimeout(() => {
          setUserMessage("");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setUserMessageError("При обновлении профиля произошла ошибка");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /* СОХРАНЕНИЕ И УДАЛЕНИЕ ФИЛЬМОВ */

  const changeSaveMovie = (movie) => {
    const jwt = localStorage.getItem("jwt");

    const handledMovie = savedMovies.find((item) => {
      if (location.pathname === "/saved-movies") {
        return item.movieId === movie.movieId;
      } else {
        return item.movieId === movie.id;
      }
    });

    const isLiked = Boolean(handledMovie);

    const id = handledMovie ? handledMovie._id : movie._id;

    if (isLiked) {
      mainApi
        .deleteMovie(id, jwt)
        .then(() => {
          const updateSavedMovies = savedMovies.filter(
            (item) => item._id !== id
          );
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(updateSavedMovies)
          );
          setSavedMovies(updateSavedMovies);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      mainApi
        .saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /* ПРОВЕРКА ТОКЕНА АВТОРИЗАЦИИ*/

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            navigate(path);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    function fetchData() {
      if (isLoggedIn) {
        return mainApi
          .getSaveMovies()
          .then((movies) => {
            setSavedMovies(movies);
          })
          .catch(console.error);
      }
    }
    fetchData();
  }, [isLoggedIn]);

  /* ВЫХОД */
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
                <Movies
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onLoading={setIsLoading}
                  savedMovies={savedMovies}
                  changeSave={changeSaveMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <SavedMovies
                  loggedIn={isLoggedIn}
                  isLoading={isLoading}
                  onLoading={setIsLoading}
                  savedMovies={savedMovies}
                  changeSave={changeSaveMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile
                  loggedIn={isLoggedIn}
                  onSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  userMessage={userMessage}
                  userMessageError={userMessageError}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                userMessageError={userMessageError}
              />
            }
          />
          <Route
            path="/signin"
            loggedIn={isLoggedIn}
            element={
              <Login
                onLogin={handleLogin}
                userMessageError={userMessageError}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;