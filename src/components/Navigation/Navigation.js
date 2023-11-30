import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BurgerMenu from "../Navigation/BurgerMenu/BurgerMenu";
import profileIcon from "../../images/profile-icon.svg";

function Navigation({ loggedIn }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const location = useLocation();
  const toggleBurgerMenuOpen = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };
  return (
    <nav className="navigation">
      {loggedIn ? (
        <>
          <div className="navigation__movies">
            <Link
              to="/movies"
              className={
                location.pathname === "/movies"
                  ? "navigation__movies-link navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                location.pathname === "/saved-movies"
                  ? "navigation__movies-link navigation__movies-link_active"
                  : "navigation__movies-link"
              }
            >
              Сохраненные фильмы
            </Link>
          </div>
          <div
            className={
              location.pathname === "/"
                ? "navigation__button"
                : "navigation__button navigation__button_black"
            }
          >
            <Link className="navigation__button-link" to="/profile">
              Аккаунт
              <div
                className={
                  location.pathname === "/"
                    ? "navigation__button-account"
                    : "navigation__button-account navigation__button-account-grey"
                }
              >
                <img
                  src={profileIcon}
                  alt="Иконка кнопки профиля"
                  className="navigation__button-image"
                />
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="navigation__auth">
          <Link to="/signup" className="navigation__auth-link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__auth-link navigation__auth-link_type_login"
          >
            Войти
          </Link>
        </div>
      )}
      {loggedIn && !isBurgerMenuOpen ? (
        <button
          className="navigation__burger-btn"
          onClick={toggleBurgerMenuOpen}
        />
      ) : (
        <BurgerMenu onClose={toggleBurgerMenuOpen} loggedIn={loggedIn} />
      )}
    </nav>
  );
}

export default Navigation;
