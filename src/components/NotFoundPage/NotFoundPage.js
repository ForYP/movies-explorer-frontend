import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__title">404</h1>
        <p className="error-page__text">Страница не найдена</p>
        <Link to="/" className="error-page__link">
          Назад
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
