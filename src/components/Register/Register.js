import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import useForm from "../../hooks/useForm";

function Register({ onRegister, userMessageError }) {
  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
    isPending,
    setIsPending,
  } = useForm();
  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister({
      values,
      setPendingCallback: setIsPending,
      resetFormCallback: resetForm,
    });
  };
  return (
    <section className="register">
      <div className="register__header">
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
      </div>
      <form className="register__form form" onSubmit={handleSubmit}>
        <label className="register__label" htmlFor="name">
          Имя
        </label>
        <input
          className="register__input"
          type="text"
          id="name"
          name="name"
          minLength={2}
          maxLength={30}
          required
          value={values.name || ""}
          onChange={handleChange}
          placeholder="Имя"
        />
        <span className="register__error">{errors.name}</span>
        <label className="register__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          pattern="[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}"
          required
          value={values.email || ""}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <span className="register__error">{errors.email}</span>
        <label className="register__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="register__input register__input_password"
          type="password"
          id="password"
          name="password"
          required
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <span className="register__error">{errors.password}</span>
        <span className="register__error">{userMessageError}</span>
        <button
          className="register__button"
          type="submit"
          disabled={!isValid || isPending}
        >
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
