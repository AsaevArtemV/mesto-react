import React, {useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="App">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        {/* Редактирования профиля */}
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
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
                />
                <span className="popup__input-error job-input-error" />
              </label>
            </>
          }
        />
        {/* <!--Обновление аватара--> */}
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={
            <label className="popup__field">
              <input
                className="popup__input popup__input_type_avatar-link"
                type="url"
                name="link"
                id="avatar-link-input"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__input-error avatar-link-input-error" />
            </label>
          }
        />
        {/* <!--Добавления новой карточки--> */}
        <PopupWithForm
          name="cards"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
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
                  required
                />
                <span className="popup__input-error link-input-error" />
              </label>
            </>
          }
        />
        {/* Просмотр карточки */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        {/* <!--Удаления карточки--> */}
        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          isOpen={false}
        />
      </div>
    </div>
  );
}

export default App;