import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://github.com/ForYP/how-to-learn"
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__list-text">Статичный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/ForYP/russian-travel"
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__list-text">Адаптивный сайт</p>
            <span>&#8599;</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/ForYP/mesto-react"
            className="portfolio__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__list-text">Одностраничное приложение</p>
            <span>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
