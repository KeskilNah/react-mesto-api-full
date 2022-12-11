export const BASE_URL = "http://api.super.mesto.nomoredomains.club";

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkError);
};

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkError);
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then(checkError);
};

const checkError = (res) => {
  console.log(res);
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ОШИБКА: ${res.message}`);
};
