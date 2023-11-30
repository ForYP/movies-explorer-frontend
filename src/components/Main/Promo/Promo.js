import React from "react";
import picture from "../../../images/promo-picture.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <img src={picture} alt="Вектор Практкума" className="promo__picture" />
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
      </div>
    </section>
  );
}

export default Promo;
