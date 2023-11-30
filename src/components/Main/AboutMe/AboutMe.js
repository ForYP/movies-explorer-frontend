import React from "react";
import avatar from "../../../images/avatar.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title" id="me">
        Студент
      </h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Сергей</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 31 год</p>
          <p className="about-me__description">
            Я родился в Краснодарском крае. Закончил КГИК факультет консерватория г.Краснодар. Недавно начал кодить. Заканчиваю курс по веб-разработке, занимаюсь пет-проектами и активно ищу работу.
          </p>
          <a
            href="https://github.com/ForYP"
            className="about-me__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__avatar" alt="Фото" src={avatar} />
      </div>
    </section>
  );
}

export default AboutMe;
