import React from "react";
import { Link, useLocation } from "react-router-dom";
import profileIcon from "../../../images/profile-icon.svg";

function BurgerMenu({ onClose, loggedIn }) {
  const location = useLocation();
  return (
    <div className={loggedIn ? "burger" : "burger-hide"}>
      <div className="burger__overlay">
        <div className="burger__container">
          <button
            type="button"
            className="burger__close-button"
            onClick={() => onClose()}
          />
          <div className="burger__menu">
            <Link
              to="/"
              className={
                location.pathname === "/"
                  ? "burger__link-active"
                  : "burger__link"
              }
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={
                location.pathname === "/movies"
                  ? "burger__link-active"
                  : "burger__link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                location.pathname === "/saved-movies"
                  ? "burger__link-active"
                  : "burger__link"
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div className="burger__button-account">
            <Link className="burger__button-link" to="/profile">
              Аккаунт
              <img
                src={profileIcon}
                alt="Иконка кнопки профиля"
                className="burger__button-image"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerMenu;
