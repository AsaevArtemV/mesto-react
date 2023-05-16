import { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Создать'}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_title"
          type="text"
          name="name"
          id="title-input"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-error title-input-error" />
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_link"
          type="url"
          name="link"
          id="link-input"
          placeholder="Ссылка на картинку"
          onChange={handleLinkChange}
          value={link}
          required
        />
        <span className="popup__input-error link-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;