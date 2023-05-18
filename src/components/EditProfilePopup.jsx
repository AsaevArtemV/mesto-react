import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }
  
    function handleNameChange(evt) {
      setName(evt.target.value);
    }
  
    function handleDescriptionChange(evt) {
      setDescription(evt.target.value);
    }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          id="name-input"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name || ''}
        />
        <span className="popup__input-error name-input-error" />
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_job"
          type="text"
          name="about"
          id="job-input"
          placeholder="Профессия"
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
          value={description || ''}
        />
        <span className="popup__input-error job-input-error" />
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;