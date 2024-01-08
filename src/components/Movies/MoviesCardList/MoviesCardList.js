import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import { checkSavedCard } from "../../../utils/utils";
import useScreenWidth from "../../../hooks/useScreenWidth";

import {
  MOVIES_ROW_DESKTOP,
  MOVIES_ROW_TABLET,
  MOVIES_ROW_MOBILE,
  MOVIES_LINE_DESKTOP,
  MOVIES_LINE_MOBILE,
  TABLET_SCREEN,
  MOBILE_SCREEN,
} from "../../../utils/constants";

function MoviesCardList({
  isSavedMoviesPage,
  movies,
  changeSave,
  savedMovies,
  userMessage,
}) {
  const [showMoviesList, setShowMoviesList] = useState(movies);
  const screenWidth = useScreenWidth();
  const searchedMoviesCount = movies ? movies.length : 0;

  const handleMoreClick = () => {
    if (screenWidth > TABLET_SCREEN) {
      setShowMoviesList(
        movies.slice(
          0,
          showMoviesList.length + MOVIES_LINE_DESKTOP
        )
      );
    } else {
      setShowMoviesList(
        movies.slice(
          0,
          showMoviesList.length + MOVIES_LINE_MOBILE
        )
      );
    }
  };
  useEffect(() => {
    if (screenWidth > TABLET_SCREEN) {
      setShowMoviesList(movies.slice(0, MOVIES_ROW_DESKTOP));
    } else if (screenWidth > MOBILE_SCREEN && screenWidth <= TABLET_SCREEN) {
      setShowMoviesList(movies.slice(0, MOVIES_ROW_TABLET));
    } else if (screenWidth <= MOBILE_SCREEN) {
      setShowMoviesList(movies.slice(0, MOVIES_ROW_MOBILE));
    } else {
      setShowMoviesList(movies);
    }
  }, [screenWidth, movies]);

  return (
    <section className="cards" aria-label="Фильмы">
      {userMessage ? (
        <span className="message">{userMessage}</span>
      ) : (
        <span></span>
      )}

      <ul className="cards__list">
        {showMoviesList.sort().map((movie) => {
          return (
            <MoviesCard
              key={isSavedMoviesPage ? movie.movieId : movie.id}
              movie={movie}
              isSavedMoviesPage={isSavedMoviesPage}
              changeSave={changeSave}
              saved={checkSavedCard(savedMovies, movie)}
            />
          );
        })}
      </ul>
      {!isSavedMoviesPage &&
        showMoviesList &&
        searchedMoviesCount !== showMoviesList.length && (
          <button className={"cards__button"} onClick={handleMoreClick}>
            Ещё
          </button>
        )}
    </section>
  );
}

export default MoviesCardList;
