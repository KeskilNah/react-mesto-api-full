import React from "react";

export default function PopupWithForm({
  onClose,
  isOpen,
  name,
  title,
  children,
  onSubmit,
  buttonText,
  buttonActiveText,
  isFormError,
  isRequesting,
}) {
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    } else {
      document.removeEventListener("keydown", handleEscClose);
    }
  }, [isOpen, onClose]);

  return (
    <div
      className={`${name}-popup popup ${isOpen ? "popup_opened" : ""}`}
      onClick={(evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          onClose();
        }
      }}
    >
      <div className={`${name}-popup__container`}>
        <button
          className={`${name}-popup__exit popup__close`}
          onClick={() => onClose()}
        />
        <h2 className={`${name}-popup__title`}>{`${title}`}</h2>
        <form
          className={`${name}-popup__form popup__form`}
          name={`${name}-form`}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="popup__inputs">{children}</div>
          <button
            type="submit"
            className={`${name}-popup__save-button popup__button ${
              isFormError ? `popup__button_disabled` : ""
            }`}
            disabled={isFormError}
          >
            {isRequesting ? buttonText : buttonActiveText}
          </button>
        </form>
      </div>
    </div>
  );
}
