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
  const [allMovies, setAllMovies] = useState(
    JSON.parse(localStorage.getItem("movies")) ?? []
  );

  /* РЕГИСТРАЦИЯ */

  function handleRegister({
    values: { name, email, password },
    setPendingCallback,
    resetFormCallback,
  }) {
    setPendingCallback(true);
    return mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin({ values: { email, password } });
        resetFormCallback();
      })
      .catch((error) => {
        console.log(error);
        setUserMessageError("Что-то пошло не так...");
        setTimeout(() => {
          setUserMessageError("");
        }, 2000);
      })
      .finally(() => {
        setPendingCallback(false);
      });
  }

  /* ВХОД */

  function handleLogin({
    values: { email, password },
    setPendingCallback = () => {},
    resetFormCallback = () => {},
  }) {
    setPendingCallback(true);
    return mainApi
      .login(email, password)
      .then(({ token }) => {
        localStorage.setItem("jwt", token);
        Promise.all([mainApi.getUserInfo(), mainApi.getSaveMovies()]).then(
          ([user, movies]) => {
            setCurrentUser(user);
            setSavedMovies(movies);
            setIsLoggedIn(true);
            resetFormCallback();
            navigate("/movies");
          }
        );
      })
      .catch((error) => {
        console.log(error);
        setUserMessageError("Неправильные почта или пароль");
        setTimeout(() => {
          setUserMessageError("");
        }, 2000);
      })
      .finally(() => {
        setPendingCallback(false);
      });
  }

  /* РЕДАКТИРОВАНИЕ ПРОФИЛЯ */

  function handleUpdateUser({ values, setPendingCallback, resetFormCallback }) {
    setPendingCallback(true);
    mainApi
      .setUserInfo(values)
      .then((user) => {
        setCurrentUser(user);
        resetFormCallback(true);
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
        setPendingCallback(false);
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
          setSavedMovies((prev) => [newSavedMovie, ...prev]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /* ПРОВЕРКА ТОКЕНА АВТОРИЗАЦИИ*/

  useEffect(() => {
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
    setCurrentUser({});
    setSavedMovies([]);
    setAllMovies([]);
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("allMovies");
    localStorage.removeItem("allFilmsSearch");
    localStorage.removeItem("allFilmsShort");
    navigate("/");
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
                  isAllMovies={allMovies}
                  setIsAllMovies={setAllMovies}
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
              <ProtectedRoute loggedIn={!isLoggedIn}>
                <Register
                  onRegister={handleRegister}
                  userMessageError={userMessageError}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            loggedIn={isLoggedIn}
            element={
              <ProtectedRoute loggedIn={!isLoggedIn}>
                <Login
                  onLogin={handleLogin}
                  userMessageError={userMessageError}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
