import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

export function Register({ onRegisterSubmit }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSubmit(values);
  };

  return (
    <div className="reg">
      <h2 className="reg__title">Регистрация</h2>
      <form className="reg__form" onSubmit={handleSubmit}>
        <input
          className="reg__email reg__input"
          value={values.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          className="reg__password reg__input"
          placeholder="Пароль"
          value={values.password}
          name="password"
          onChange={handleChange}
        />
        <button className="reg__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="reg__sign-in">
        Уже зарегистрированы?
        <Link to="sign-in" className="reg__sign-in">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}
export default withRouter(Register);
