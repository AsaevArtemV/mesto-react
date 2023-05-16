function PopupWithForm({ title, name, isOpen, onClose, children, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть окно"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className="popup__form"
          name={`${name}-form`}
          autoComplete='off'
          onSubmit={onSubmit}
        >
          <fieldset className="popup__set">
            {children}
            <button 
              className="popup__save-button"
              type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;