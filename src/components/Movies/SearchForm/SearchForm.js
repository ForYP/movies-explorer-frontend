import React, { useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../../images/search-btn.svg";
import useForm from "../../../hooks/useForm";
import { useLocation } from "react-router-dom";

function SearchForm({
  onSearchMovies,
  isSavedMoviesPage,
  onFilter,
  shortMovies,
}) {
  const location = useLocation();
  const { values, handleChange, resetForm, isValid } = useForm();

  function handleMoviesFormSubmit(event) {
    event.preventDefault();
    onSearchMovies(values.searchMovie, isValid, shortMovies, resetForm);
  }

  function handleSavedMoviesFormSubmit(event) {
    event.preventDefault();
    onSearchMovies(values.searchMovie, shortMovies, resetForm);
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const searchValue = localStorage.getItem("movieSearch");
      values.searchMovie = searchValue;
    }
  }, [location]);

  return (
    <section className="search" aria-label="Поиск">
      {isSavedMoviesPage ? (
        <>
          <form
            className="search__form form"
            name="search-saved-movie-form"
            onSubmit={handleSavedMoviesFormSubmit}
            noValidate
          >
            <input
              type="text"
              placeholder="Фильм"
              className="search__input"
              required
              name="searchMovie"
              value={values.searchMovie || ""}
              onChange={handleChange}
            />
            <button type="submit" className="search__button">
              <img
                src={searchIcon}
                alt="Поиск"
                className="search__button-image"
              />
            </button>
          </form>
          <FilterCheckbox isMovieFilter={shortMovies} onFilter={onFilter} />
        </>
      ) : (
        <>
          <form
            className="search__form form"
            name="search-movie-form"
            onSubmit={handleMoviesFormSubmit}
            noValidate
          >
            <input
              type="text"
              placeholder="Фильм"
              className="search__input"
              required
              name="searchMovie"
              value={values.searchMovie || ""}
              onChange={handleChange}
            />
            <button type="submit" className="search__button">
              <img
                src={searchIcon}
                alt="Поиск"
                className="search__button-image"
              />
            </button>
          </form>
          <FilterCheckbox isMovieFilter={shortMovies} onFilter={onFilter} />
        </>
      )}
    </section>
  );
}

export default SearchForm;
