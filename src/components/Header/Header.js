import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const location = useLocation();

  return (
    <header
      className={location.pathname === "/" ? "header" : "header header_black"}
    >
      <div className="header__container">
        <Logo />
        <Navigation loggedIn={loggedIn} />
      </div>
    </header>
  );
}

export default Header;
