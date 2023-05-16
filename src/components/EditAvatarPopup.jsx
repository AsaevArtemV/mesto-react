import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({ 
        avatar: avatarRef.current.value 
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
     >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar-link"
          type="url"
          name="link"
          id="avatar-link-input"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span className="popup__input-error avatar-link-input-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;