import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../../images/search-btn.svg";

function SearchForm() {
  return (
    <section className="search" aria-label="Поиск">
      <form className="search__form">
        <input type="search" placeholder="Фильм" className="search__input" />
        <button type="submit" className="search__button">
          <img src={searchIcon} alt="Поиск" className="search__button-image" />
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
