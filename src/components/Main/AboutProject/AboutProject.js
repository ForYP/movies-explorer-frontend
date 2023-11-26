import React from "react";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title" id="about-project">
        О проекте
      </h2>
      <div className="about-project__content">
        <div className="about-project__block">
          <h3 className="about-project__block-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__block-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__block">
          <h3 className="about-project__block-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__block-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__chart">
        <div className="about-project__backend">
          <p className="about-project__duration about-project__duration_color_green">1 неделя</p>
          <p className="about-project__label">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <p className="about-project__duration about-project__duration_color_black">4 недели</p>
          <p className="about-project__label">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
