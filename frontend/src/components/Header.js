import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Switch } from "react-router-dom";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="лого_место" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/">
          <div className="header__userInfo">
            <p className="header__email">{email}</p>
            <button className="header__button" onClick={() => onLogout()}>
              Выход
            </button>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
