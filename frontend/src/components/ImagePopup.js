import React from "react";

export default function ImagePopup({ onClose, isOpen, name, card }) {
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
          onClick={() => {
            onClose();
          }}
          className={`${name}-popup__exit popup__close`}
        />
        <p className={`${name}-popup__title`}>{card?.alt ?? ""}</p>
        <img
          src={`${card?.src ?? ""}`}
          alt={`${card?.alt ?? ""}`}
          className={`${name}-popup__pic`}
        />
      </div>
    </div>
  );
}
