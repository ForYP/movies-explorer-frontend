import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { convertMinToHours } from "../../../utils/utils";
import useScreenWidth from "../../../hooks/useScreenWidth";

function MoviesCard({ movie, isSavedMoviesPage, changeSave, saved }) {
  const screenWidth = useScreenWidth();
  const [isMobile, setIsMobile] = useState(false);

  const handleButtonClick = () => {
    changeSave(movie);
  };

  useEffect(() => {
    if (screenWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [screenWidth]);

  return (
    <li className="card">
      <Link
        to={movie.trailerLink}
        className="card__link"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src={
            isSavedMoviesPage
              ? movie.image
              : `https://api.nomoreparties.co${movie.image.url}`
          }
          alt={`Фильм - ${movie.nameRU}`}
        />
      </Link>
      <div className="card__content">
        <div className="card__description">
          <h2 className="card__title">{movie.nameRU}</h2>
          <span className="card__duration">
            {convertMinToHours(movie.duration)}
          </span>
        </div>

        <button
          className={`card__button 
          ${isSavedMoviesPage ? "card__button_delete" : ""} 
          ${!isSavedMoviesPage && saved && isMobile ? "card__button_save" : ""}
          ${!isSavedMoviesPage && saved && !isMobile ? "card__button_save" : ""}
          `}
          type="button"
          onClick={handleButtonClick}
        />
      </div>
    </li>
  );
}

export default MoviesCard;
