import { useState, useEffect } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
    .then(res => {
      setCurrentUser(res[0]);
      setCards([...res[1]])
    })
    .catch(console.error);
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    const handleOverlay = (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            closeAllPopups();
        }
      };

    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      document.addEventListener('mousedown', handleOverlay);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
        document.removeEventListener('mousedown', handleOverlay);
      }
    }
  }, [isOpen])

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

  function handleCardLike(likes, _id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === _id ? newCard : c));
      })
      .catch(console.error);
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id));
      })
      .catch(console.error);
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar({link: data.avatar})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          <Footer />
            {/* Редактирования профиля */}
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            {/* <!--Обновление аватара--> */}
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            {/* <!--Добавления новой карточки--> */}
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
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
                buttonText={'Да'}
                isOpen={false}
            />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;