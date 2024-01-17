import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import Logo from "../Logo/Logo";

function Login({ onLogin, userMessageError }) {
  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
    setIsPending,
    isPending,
  } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin({
      values,
      setPendingCallback: setIsPending,
      resetFormCallback: resetForm,
    });
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
          pattern="[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="login__error">{errors.email}</span>
        <label className="login__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="login__input login__input_password"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="login__error">{errors.password}</span>
        <span className="login__error">{userMessageError}</span>
        <button
          className="login__button"
          type="submit"
          disabled={!isValid || isPending}
        >
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
