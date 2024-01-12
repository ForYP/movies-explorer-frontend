import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Movies/Preloader/Preloader";

import { filterMovies } from "../../utils/utils";
import moviesApi from "../../utils/MoviesApi";

function Movies({ loggedIn, onLoading, isLoading, savedMovies, changeSave, isAllMovies, setIsAllMovies }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [savedUserRequest] = useState(
    localStorage.getItem("allFilmsSearch") ?? ""
  );
  const [savedIsShort] = useState(
    JSON.parse(localStorage.getItem("allFilmsShort")) ?? false
  );

  const handleFilteredMovies = (movies, userRequest, shortMoviesCheckbox) => {
    const moviesList = filterMovies(movies, userRequest, shortMoviesCheckbox);
    if (moviesList.length === 0) {
      setUserMessage("Ничего не найдено");
    } else {
      setUserMessage("");
    }

    setFilteredMovies(moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
  };

  const handleSearchSubmit = (inputValue, checkboxState) => {
    localStorage.setItem("allFilmsSearch", inputValue);
    localStorage.setItem("allFilmsShort", JSON.stringify(checkboxState));
    if (inputValue === undefined || inputValue.trim().length === 0) {
      if (checkboxState) {
        handleFilteredMovies(isAllMovies, inputValue, checkboxState);
      } else {
        setFilteredMovies([]);
      }

      setUserMessage("Нужно ввести ключевое слово");
      setTimeout(() => {
        setUserMessage("");
      }, 2000);
      return;
    }

    if (isAllMovies.length === 0) {
      onLoading(true);
      setUserMessage("");
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          setIsAllMovies(movies);
          handleFilteredMovies(movies, inputValue, checkboxState);
        })
        .catch((error) => {
          console.log(error);
          setUserMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => onLoading(false));
    } else {
      handleFilteredMovies(isAllMovies, inputValue, checkboxState);
    }
  };

  useEffect(() => {
    const savedMovies = 
   JSON.parse(localStorage.getItem('movies'));  
    if (savedMovies && savedMovies.length > 0) {
    setFilteredMovies(savedMovies);
    }
  },[]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={handleSearchSubmit}
        initialSearchMovie={savedUserRequest}
        initialIsShort={savedIsShort}
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
