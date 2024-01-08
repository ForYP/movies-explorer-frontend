import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";

import { filterMovies, filterShorts } from "../../utils/utils";
import { useLocation } from "react-router-dom";
import moviesApi from "../../utils/MoviesApi";

function Movies({
  loggedIn,
  onLoading,
  isLoading,
  savedMovies,
  changeSave,
}) {
  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isAllMovies, setIsAllMovies] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const location = useLocation();

  const handleFilteredMovies = (movies, userRequest, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userRequest, false);
    if (moviesList.length === 0) {
      setUserMessage("Ничего не найдено");
    } else {
      setUserMessage("");
    }
    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShorts(moviesList) : moviesList
    );
    localStorage.setItem("movies", JSON.stringify(moviesList));
  };

  const handleSearchSubmit = (inputValue) => {
    if (inputValue === undefined || inputValue.trim().length === 0) {
      handleFilteredMovies(isAllMovies, inputValue, shortMovies);
      setUserMessage("Нужно ввести ключевое слово");
      setTimeout(() => {
        setUserMessage("");
      }, 2000);
      return;
    }

    localStorage.setItem("movieSearch", inputValue);
    localStorage.setItem("shortMovies", shortMovies);

    if (isAllMovies.length === 0) {
      onLoading(true);
      setUserMessage("");
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          setIsAllMovies(movies);
          handleFilteredMovies(movies, inputValue, shortMovies);
        })
        .catch((error) => {
          console.log(error);
          setUserMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => onLoading(false));
    } else {
      handleFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  };

  const handleShortsFilms = () => {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShorts(initialMovies));
      if (filterMovies.length === 0) {
        setUserMessage("Ничего не найдено");
      }
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem("shortMovies", !shortMovies);
  };

  useEffect(() => {
    if (localStorage.getItem("shortMovies") === "true") {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialMovies(movies);
      if (localStorage.getItem("shortMovies") === "true") {
        setFilteredMovies(filterShorts(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, [location]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={handleSearchSubmit}
        onFilter={handleShortsFilms}
        shortMovies={shortMovies}
      />
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
        movies={filteredMovies}
        savedMovies={savedMovies}
        changeSave={changeSave}
        userMessage={userMessage}
        isSavedMoviesPage={false}
        />
      )}
      <Footer />
    </>
  );
}

export default Movies;