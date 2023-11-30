import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Register() {
  return (
    <section className="register">
      <div className="register__header">
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>
      <form className="register__form">
        <label className="register__label" htmlFor="name">
          Имя
        </label>
        <input
          className="register__input"
          type="text"
          id="name"
          name="name"
          required
          value="Сергей"
        />
        <span className="register__error"></span>
        <label className="register__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          required
          value="pochta@yandex.ru"
        />
        <span className="register__error"></span>
        <label className="register__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="register__input register__input_password"
          type="password"
          id="password"
          name="password"
          required
          value="••••••••••••••"
        />
        <span className="register__error">Что-то пошло не так...</span>
        <button className="register__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <span>Уже зарегистрированы?</span>
        <Link to="/signin" className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
