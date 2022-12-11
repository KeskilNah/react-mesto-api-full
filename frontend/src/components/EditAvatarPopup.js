import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  onClose,
  isOpen,
  onUpdateAvatar,
  isRequesting,
}) {
  const avatarRef = React.useRef();
  const [isLinkError, setLinkError] = useState("");
  const [linkErrorMessage, setLinkErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  React.useEffect(() => {
    setIsFormValid(isLinkError);
  }, [isLinkError]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef,
    });
  }

  function onChange() {
    setLinkErrorMessage(
      avatarRef.current.validity.valid
        ? ""
        : avatarRef.current.validationMessage
    );
    setLinkError(
      avatarRef.current.validity.valid ? "" : "popup__error_visible"
    );
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      buttonActiveText="Сохранение..."
      isRequesting={isRequesting}
      children={
        <div className="popup__inputs">
          <input
            ref={avatarRef}
            type="url"
            className={`avatar-popup__text-url popup__input`}
            placeholder="Ссылка на картинку"
            defaultValue=""
            required
            id="input-description"
            onChange={onChange}
          />
          <p className={`popup__error ${isLinkError} input-description-error`}>
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
