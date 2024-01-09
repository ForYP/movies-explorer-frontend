import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { filterMovies } from "../../utils/utils";
import Preloader from "../Movies/Preloader/Preloader";

const SavedMovies = ({ loggedIn, savedMovies, isLoading, changeSave }) => {
  const [shortMovies, setShortMovies] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMovies);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);
  const [searchRequest, setSearchRequest] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const handleFilteredMovies = (movies, userRequest, shortMoviesCheckbox) => {
    const moviesList = filterMovies(
      savedMovies,
      userRequest,
      shortMoviesCheckbox
    );

    if (moviesList.length === 0) {
      setUserMessage("Ничего не найдено");
    } else {
      setUserMessage("");
    }
    setFilteredMovies(moviesList);
  };

  const handleSearchSubmit = (inputValue, checkboxState) => {
    setSearchRequest(inputValue);
    setShortMovies(checkboxState);
    handleFilteredMovies(savedMovies, inputValue, checkboxState);
    if ((inputValue === undefined || inputValue.trim().length === 0) && !checkboxState) {
      setUserMessage("Нужно ввести ключевое слово");
      setTimeout(() => {
        setUserMessage("");
      }, 2000);
      return;
    }
  };

  useEffect(() => {
    if ((!searchRequest || searchRequest.length === 0) && !shortMovies) {
      setFilteredMovies([]);
    }
  }, [searchRequest, shortMovies]);

  
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSearchMovies={handleSearchSubmit}
        initialSearchMovie={""}
        initialIsShort={false}
      />
      {userMessage ? (
        <span className="message">{userMessage}</span>
      ) : (
        <span></span>
      )}
      {isLoading && <Preloader />}
      {!isLoading && (
        <MoviesCardList
          isSavedMoviesPage={true}
          movies={filteredMovies.length === 0 ? savedMovies : filteredMovies}
          savedMovies={savedMovies}
          changeSave={changeSave}
        />
      )}
      <Footer />
    </>
  );
};

export default SavedMovies;
