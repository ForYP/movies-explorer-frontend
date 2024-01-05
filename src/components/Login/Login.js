import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Logo from "../Logo/Logo";

function Login({onLogin}) {
  const { values, errors, handleChange, isFormValid } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };
  return (
    <section className="login">
      <div className="login__header">
        <Logo />
        <h1 className="login__title">Рады видеть!</h1>
      </div>
      <form className="login__form form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="login__input"
          type="email"
          name="email"
          id="email"
          placeholder="pochta@yandex.ru"
          required
          value={values.email || ''}
          onChange={handleChange}
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
          value={values.password || ''}
          onChange={handleChange}
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
