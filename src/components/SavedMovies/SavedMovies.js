import React from "react";
import Header from "../Header/Header";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import savedMovies from "../../utils/savedMovies";

const SavedMovies = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList buttonMore={false} movies={savedMovies} />
      <Footer />
    </>
  );
};

export default SavedMovies;
