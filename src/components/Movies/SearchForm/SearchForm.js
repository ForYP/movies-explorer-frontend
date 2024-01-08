import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../../images/search-btn.svg";
import useForm from "../../../hooks/useForm";
import { useLocation } from "react-router-dom";
// const SearchForm = ({ onSearch, initialTerm, initialIsShort }) => {
//   const { values, handleChange, resetForm, isValid } = useForm({
//     searchMovie: initialTerm,
//     isShort: initialIsShort,
//   });
//   // далее - без изменений
// };
function SearchForm({
  // onSearchMovies,
  // isSavedMoviesPage,
  // onFilter,
  // shortMovies,
  onSearchMovies,
  initialSearchMovie,
  initialIsShort,
}) {
  // const location = useLocation();
  const { values, handleChange } = useForm({
    searchMovie: initialSearchMovie,
  });
  const [isShort, setIsShort] = useState(initialIsShort);
  // useEffect(() => {
  //   onSearchMovies(values.searchMovie, isShort);
  // }, [isShort]);

  function handleSubmit(event) {
    event.preventDefault();
    onSearchMovies(values.searchMovie, isShort);
  }

  function handleCheckbox(event) {
    onSearchMovies(values.searchMovie, event.target.checked );
    setIsShort(event.target.checked);
  }
  // useEffect(() => {
  //   if (
  //     location.pathname === "/movies" &&
  //     localStorage.getItem("movieSearch")
  //   ) {
  //     const searchValue = localStorage.getItem("movieSearch");
  //     values.searchMovie = searchValue;
  //   }
  // }, [location]);

  return (
    <section className="search" aria-label="Поиск">
      <form
        className="search__form form"
        name="search-saved-movie-form"
        onSubmit={handleSubmit}
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
          <img src={searchIcon} alt="Поиск" className="search__button-image" />
        </button>
      </form>
      <FilterCheckbox isMovieFilter={isShort} onFilter={handleCheckbox} />
    </section>
  );
}

export default SearchForm;
