import { options } from "./constants";

class Api {
  constructor(data) {
    this._url = data.url;
    this._headers = data.headers;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(this._checkError);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    }).then(this._checkError);
  }

  setCard(card) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: card.place,
        link: card.link,
      }),
    }).then(this._checkError);
  }

  editProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkError);
  }

  editAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkError);
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkError);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkError);
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ОШИБКА: ${res.message}`);
  }
}

const readyApi = new Api(options);
export default readyApi;
