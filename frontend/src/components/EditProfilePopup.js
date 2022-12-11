import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  onClose,
  isOpen,
  onUpdateUser,
  isRequesting,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const [isNameError, setNameError] = useState("");
  const [isDescriptionError, setDescriptionError] = useState("");
  const [DescriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  const [NameErrorMessage, setNameErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    setIsFormValid(isNameError || isDescriptionError);
  }, [isNameError, isDescriptionError]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
    setNameErrorMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
    setNameError(e.target.validity.valid ? "" : "popup__error_visible");
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);

    setDescriptionErrorMessage(
      e.target.validity.valid ? "" : e.target.validationMessage
    );
    setDescriptionError(e.target.validity.valid ? "" : "popup__error_visible");
    console.dir(e.target.validity.valid);
    console.dir(e.target.validationMessage);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      buttonActiveText="Сохранение..."
      isRequesting={isRequesting}
      children={
        <div className="popup__inputs">
          <input
            type="text"
            className={`edit-popup__text-place popup__input`}
            placeholder="Имя"
            required
            minLength="2"
            maxLength="30"
            id="input-name"
            onChange={handleChangeName}
            onInput={handleChangeName}
            defaultValue={name}
          />
          <p className={`popup__error ${isNameError} input-name-error`}>
            {NameErrorMessage}
          </p>
          <input
            type="text"
            minLength="2"
            maxLength="30"
            className={`edit-popup__text-url popup__input`}
            placeholder="Род деятельности"
            defaultValue={description}
            onChange={handleChangeDescription}
            onInput={handleChangeDescription}
            required
            id="input-url"
          />
          <p className={`popup__error ${isDescriptionError} input-url-error`}>
            {DescriptionErrorMessage}
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
