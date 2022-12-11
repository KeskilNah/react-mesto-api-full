import React from "react";
import penIcoPath from "../images/icons/avatar-edit.svg";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const CardsContext = React.createContext();

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar" onClick={props.onEditAvatar}>
            <img
              src={penIcoPath}
              alt="карандашик"
              className="profile__avatar-edit-image"
            />
            <img
              src={currentUser.avatar}
              alt="Жак-Ив Кусто"
              className="profile__avatar-image"
            />
          </div>
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__button"
            onClick={props.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="gallery">
        <ul className="gallery__items">
          {props.cards.map((data) => (
            <Card
              key={data._id}
              card={data}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              onCardClick={props.onCardClick}
              link={data.link}
              likes={data.likes.length}
              name={data.name}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
