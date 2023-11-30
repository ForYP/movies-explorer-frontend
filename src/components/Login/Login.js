import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Login() {
  return (
    <section className="login">
      <div className="login__header">
        <Logo />
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form className="login__form">
        <label className="login__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="login__input"
          type="email"
          name="email"
          id="email"
          value="pochta@yandex.ru"
          required
        />
        <span className="login__error"></span>
        <label className="login__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="login__input"
          type="password"
          name="password"
          id="password"
          required
        />
        <span className="login__error"></span>
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
      <div className="login__signup">
        <span>Ещё не зарегистрированы?</span>
        <Link to="/signup" className="login__link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
