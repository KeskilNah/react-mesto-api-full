import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleClick(item) {
    props.onCardClick(item.target);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="item">
      <img
        src={props.link}
        alt={props.name}
        className="item__image"
        onClick={handleClick}
      />
      <div className="item__description">
        <p className="item__text">{props.name}</p>
        <div>
          <button
            type="button"
            onClick={handleLikeClick}
            className={`item__like ${isLiked ? "item__like_active" : ""}`}
          ></button>
          <p className="item__number">{props.likes}</p>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className={`item__delete ${
          isOwn ? "item__delete_visible" : "item__delete_hidden"
        }`}
      ></button>
    </li>
  );
}
