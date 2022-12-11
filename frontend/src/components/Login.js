import React, { useState } from "react";

export function Login({ onUpdateEmail }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEmail(values);
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__email login__input"
          value={values.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          className="login__password login__input"
          placeholder="Пароль"
          value={values.password}
          name="password"
          onChange={handleChange}
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
