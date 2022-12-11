import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  onClose,
  isOpen,
  onAddPlace,
  isRequesting,
}) {
  const [place, setPlace] = useState("");
  const [link, setLink] = useState("");
  const [isPlaceError, setPlaceError] = useState("");
  const [isLinkError, setLinkError] = useState("");
  const [placeErrorMessage, setPlaceErrorMessage] = useState("");
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [isOpen]);

  React.useEffect(() => {
    setIsFormValid(isPlaceError || isLinkError);
  }, [isPlaceError, isLinkError]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ place, link });
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
    setPlaceErrorMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
    setPlaceError(e.target.validity.valid ? "" : "popup__error_visible");
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    setLinkErrorMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
    setLinkError(e.target.validity.valid ? "" : "popup__error_visible");
  }

  return (
    <PopupWithForm
      name="adding"
      title="Новое место"
      buttonText="Создать"
      buttonActiveText="Сохранение..."
      isRequesting={isRequesting}
      children={
        <div className="popup__inputs">
          <input
            type="text"
            className={`adding-popup__text-place popup__input`}
            placeholder="Название"
            value={place}
            required
            minLength="2"
            maxLength="30"
            id="input-place"
            onChange={handleChangePlace}
            onInput={handleChangePlace}
          />
          <p className={`popup__error ${isPlaceError} input-place-error`}>
            {placeErrorMessage}
          </p>
          <input
            type="url"
            className={`adding-popup__text-url popup__input`}
            placeholder="Ссылка на картинку"
            value={link}
            required
            id="input-link"
            onChange={handleChangeLink}
            onInput={handleChangeLink}
          />
          <p className={`popup__error ${isLinkError} input-place-error`}>
            {linkErrorMessage}
          </p>
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isFormError={isFormValid}
    />
  );
}
