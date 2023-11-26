import React from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ isLoading = false, buttonMore, movies }) {
  return (
    <section className="cards" aria-label="Фильмы">
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="cards__list">
          {movies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isButtonMore={buttonMore}
              />
            );
          })}
        </div>
      )}
      <button
        className={
          buttonMore ? "cards__button" : "cards__button cards__button_hidden"
        }
      >
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
