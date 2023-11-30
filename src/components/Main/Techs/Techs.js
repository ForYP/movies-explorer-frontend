import React from "react";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title" id="techs">
        Технологии
      </h2>
      <div className="techs__info">
        <h3 className="techs__info-title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          <li className="techs__list-tech">HTML</li>
          <li className="techs__list-tech">CSS</li>
          <li className="techs__list-tech">JS</li>
          <li className="techs__list-tech">React</li>
          <li className="techs__list-tech">Git</li>
          <li className="techs__list-tech">Express.js</li>
          <li className="techs__list-tech">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
