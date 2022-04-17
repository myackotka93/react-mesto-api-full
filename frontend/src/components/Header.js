import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo_header from '../images/logo-header.svg';

const Header = ({ userEmail, onSignOut }) => {
  const location = useLocation();
  return (
    <header className="header">
      <a className="header__link" href="#" target="_blank">
        <img className="header__logo" src={logo_header} alt="Логотип" />
      </a>
      <div className="header__buttons">
        <p className="header__button header__button_email">
          {
            location.pathname === "/" ? userEmail : ""
          }
        </p>
        <Link
          to={
            location.pathname === "/sign-up" ? "/sign-in" : location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"
          }
          className="header__button header__button_logout"
          onClick={location.pathname === "/" ? onSignOut : () => { }}
        >
          {location.pathname === "/sign-up" ? "Вход" : location.pathname === "/sign-in" ? "Регистрация" : "Выйти"}
        </Link>
      </div>
    </header>
  );
}

export default Header;