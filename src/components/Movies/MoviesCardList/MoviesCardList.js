import React, { useCallback, useEffect, useMemo, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

import { checkSavedCard } from "../../../utils/utils";
import useScreenWidth from "../../../hooks/useScreenWidth";

import {
  MOVIES_COLS_MOBILE,
  MOVIES_COLS_TABLET,
  MOVIES_COLS_DESKTOP,
  MOVIES_START_MOBILE,
  MOVIES_START_TABLET,
  MOVIES_START_DESKTOP,
  MOVIES_LINE_MOBILE,
  MOVIES_LINE_TABLET,
  MOVIES_LINE_DESKTOP,
} from "../../../utils/constants";

function MoviesCardList({
  isSavedMoviesPage,
  movies,
  changeSave,
  savedMovies,
  userMessage,
}) {
  const [showMoviesList, setShowMoviesList] = useState([]);
  const { columnsCount } = useScreenWidth();
  const getInitialSize = useCallback((cols) => {
    switch (cols) {
      case MOVIES_COLS_MOBILE: {
        return MOVIES_START_MOBILE;
      }
      case MOVIES_COLS_TABLET: {
        return MOVIES_START_TABLET;
      }
      case MOVIES_COLS_DESKTOP: {
        return MOVIES_START_DESKTOP;
      }
      default:
        throw new Error("Неверное количество колонок");
    }
  }, []);
  const getNewLines = useCallback((cols) => {
    switch (cols) {
      case MOVIES_COLS_MOBILE: {
        return MOVIES_LINE_MOBILE;
      }
      case MOVIES_COLS_TABLET: {
        return MOVIES_LINE_TABLET;
      }
      case MOVIES_COLS_DESKTOP: {
        return MOVIES_LINE_DESKTOP;
      }
      default:
        throw new Error("Неверное количество колонок");
    }
  }, []);
  
  const [initialSize, setInitialSize] = useState(
    getInitialSize(columnsCount)
  );
  const [extraRows, setExtraRows] = useState(0);
  
  const moviesCount = useMemo(
    () => initialSize + extraRows * columnsCount,
    [columnsCount, extraRows, initialSize]
  );
  const isFullView = useMemo(
    () => {
      
     return movies.length - moviesCount < getNewLines(columnsCount)
    },
    [columnsCount, movies.length, moviesCount, getNewLines]
  );

  useEffect(() => {
    setInitialSize(getInitialSize(columnsCount));
    setExtraRows(0);
  }, [columnsCount, getInitialSize]);

  useEffect(() => {
    setShowMoviesList((isFullView || isSavedMoviesPage) ? movies : movies.slice(0, moviesCount));
  }, [isFullView, movies, moviesCount, isSavedMoviesPage]);

  const handleMoreClick = () => {
    setExtraRows((rows) => rows + getNewLines(columnsCount));
  };

  useEffect(() => {
    setExtraRows(0);
  }, [movies]);
 

  return (
    <section className="cards" aria-label="Фильмы">
      {userMessage ? (
        <span className="message">{userMessage}</span>
      ) : (
        <span></span>
      )}

      <ul className="cards__list">
        {showMoviesList.map((movie) => {
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
      {!isSavedMoviesPage && showMoviesList.length > 0 && !isFullView && (
        <button className={"cards__button"} onClick={handleMoreClick}>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
