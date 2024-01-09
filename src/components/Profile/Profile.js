import React, { useState, useEffect, useContext } from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useForm from "../../hooks/useForm";

const Profile = ({
  loggedIn,
  onSignOut,
  onUpdateUser,
  userMessage,
  userMessageError,
}) => {
  const [isEdit, setIsEdit] = useState(true);
  const {
    values,
    errors,
    handleChange,
    isValid,
    resetForm,
    isPending,
    setIsPending,
  } = useForm();
  const currentUser = useContext(CurrentUserContext);
  const handleChangeUserData = () => setIsEdit(!isEdit);

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser({
      values,
      setPendingCallback: setIsPending,
      resetFormCallback: setIsEdit,
    });
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form form" onSubmit={handleSubmit}>
          <div className="profile__value">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                placeholder="Имя"
                required
                value={values.name || ""}
                onChange={handleChange}
                disabled={isEdit}
              />
            </label>
          </div>
          <div className="profile__line"></div>
          <div className="profile__value">
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                type="email"
                name="email"
                placeholder="pochta@yandex.ru"
                pattern="[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}"
                required
                value={values.email || ""}
                onChange={handleChange}
                disabled={isEdit}
              />
            </label>
          </div>

          <span className="profile__error">{errors.email}</span>
          <span className="profile__error">{errors.name}</span>
          <span className="profile__error">{userMessage}</span>
          <span className="profile__error">{userMessageError}</span>
          {isEdit && (
            <div className="profile__buttons">
              <button className="profile__edit" onClick={handleChangeUserData}>
                Редактировать
              </button>
              <button className="profile__logout" onClick={() => onSignOut()}>
                Выйти из аккаунта
              </button>
            </div>
          )}

          {!isEdit && (
            <div className="profile__buttons">
              <button
                className="profile__save"
                type="submit"
                onSubmit={handleSubmit}
                disabled={
                  !isValid ||
                  (currentUser.name === values.name &&
                    currentUser.email === values.email) ||
                  isPending
                }
              >
                Сохранить
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Profile;
