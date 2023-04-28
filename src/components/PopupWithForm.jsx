//import React from "react";

function PopupWithForm({ title, name, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-button"
          aria-label="Закрыть окно"
          type="button"
        />
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className="popup__form"
          name={`${name}-form`}
          autoComplete='off'
        >
          <fieldset className="popup__set">
            {children}
            <button 
              className="popup__save-button"
              aria-label="Сохранить"
              type="submit">
              Сохранить
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;