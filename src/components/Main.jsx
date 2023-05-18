import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({
    onEditProfile, 
    onAddPlace,
    onEditAvatar, 
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
})
{

  const userContext = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <img
              src={userContext.avatar}
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
              <h1 className="profile__title">{userContext.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
              />
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
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
            _id={item._id}
            owner={item.owner}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;