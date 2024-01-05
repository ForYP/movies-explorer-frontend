import React, { useState } from "react";
import Header from "../Header/Header";

const Profile = ({ loggedIn, onSignOut }) => {
  const [name, setName] = useState("Сергей");
  const [email, setEmail] = useState("pochta@yandex.ru");
  const [isShown, setIsShown] = useState(true);

  const clickEditButton = () => setIsShown(!isShown);
  return (
    <>
      <Header loggedIn={loggedIn} />
      <div className="profile">
        <h1 className="profile__title">Привет, Сергей!</h1>
        <form className="profile__form">
          <div className="profile__value">
            <label className="profile__label">
              Имя
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="profile__input"
                required
                placeholder="Имя"
              />
            </label>
          </div>
          <div className="profile__line"></div>
          <div className="profile__value">
            <label className="profile__label">
              E-mail
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="profile__input"
                required
                placeholder="pochta@yandex.ru"
              />
            </label>
          </div>
        </form>
        {isShown && (
          <div className="profile__buttons">
            <button className="profile__edit" onClick={clickEditButton}>
              Редактировать
            </button>
            <button className="profile__logout" onClick={() => onSignOut()}>Выйти из аккаунта</button>
          </div>
        )}

        {!isShown && (
          <div className="profile__buttons">
            <button className="profile__save" type="submit">
              Сохранить
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
