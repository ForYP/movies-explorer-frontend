import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setIsButtonPressed(!isButtonPressed);
  };

  return (
    <div className="card">
      <img
        className="card__image"
        src={movie.image}
        alt={`Фильм - ${movie.title}`}
      />
      <div className="card__content">
        <div className="card__description">
          <h2 className="card__title">{movie.title}</h2>
          <span className="card__duration">{movie.duration}</span>
        </div>

        <button
          className={`card__button 
          ${!isButtonPressed && movie.saved ? "card__button_save" : ""}
          ${isSavedMoviesPage ? "card__button_delete" : ""} 
          `}
          onClick={handleButtonClick}
        ></button>
      </div>
    </div>
  );
}

export default MoviesCard;
