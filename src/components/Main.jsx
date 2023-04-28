import React, {useState, useEffect} from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
    .then(res => {
      setUserName(res[0].name);
      setUserDescription(res[0].about);
      setUserAvatar(res[0].avatar);
      setCards([...res[1]])
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <img
              src={userAvatar}
              className="profile__avatar-image"
              alt="Аватар профиля"
            />
            <button
              onClick={onEditAvatar}
              className="profile__avatar-button" 
              type="button" 
              aria-label="Обнавление аватара профиля"
            />
          </div>
            <div className="profile__info">
            <div className="profile__block">
              <h1 className="profile__title">{userName}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
              />
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
         />
      </section>
      <section className="elements" aria-label="Просмотр картинки">
        {cards.map((item) => (
          <Card
            name={item.name}
            link={item.link}
            likes={[...item.likes]}
            key={item._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;