import { useState, useEffect } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "./CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletedCardPopupOpen, setIsDeletedCardPopupOpen] = useState(null);

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
    .catch((err) => console.log(err));
  }, []);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeletedCardPopupOpen(null);
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

  function handleCardDeleteClick(card) {
    setIsDeletedCardPopupOpen(card);
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
      .catch((err) => console.log(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== id));
        //closeAllPopups();
        console.log("тест")
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar({link: data.avatar})
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
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
              onCardDelete={handleCardDeleteClick}
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
            <ConfirmDeletePopup
              isOpen={isDeletedCardPopupOpen}
              onClose={closeAllPopups}
              onDelete={handleCardDelete}
            />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;