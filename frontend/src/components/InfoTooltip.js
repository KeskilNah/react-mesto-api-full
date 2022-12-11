import React from "react";

export function InfoTooltip({ onClose, isOpen, isRequestBad }) {
  console.log(isRequestBad);
  return (
    <div className={`infoTooltip-popup popup ${isOpen ? "popup_opened" : ""}`}>
      <div className={`infoTooltip-popup__container`}>
        <button
          className={`infoTooltip-popup__exit popup__close`}
          onClick={() => onClose()}
        />
        <div
          className={`infoTooltip-popup__image ${
            isRequestBad
              ? "infoTooltip-popup__image_type_error"
              : "infoTooltip-popup__image_type_acept"
          }`}
        />
        <h2 className={`infoTooltip-popup__title`}>
          {isRequestBad ? "Что-то пошло не так!" : "Вы успешно "}
          <br />
          {isRequestBad ? "Попробуйте ещё раз" : "зарегистрировались!"}
        </h2>
      </div>
    </div>
  );
}
