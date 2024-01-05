import React from "react";
import { Link, useNavigate  } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__title">404</h1>
        <p className="error-page__text">Страница не найдена</p>
        <Link onClick={handleGoBack} className="error-page__link">
          Назад
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
