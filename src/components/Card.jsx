import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

function Card({ onCardClick, link, name, likes, owner, _id, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

  function handleClickCard() {
    onCardClick({ link, name });
  }

  function handleDeleteClick() {
    onCardDelete(_id);
  }

  function handleLikeClick() { 
    onCardLike(likes, _id);
  }

  return (
    <article className="card">
      {isOwn && <button
        className="card__delete-button"
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      />}
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleClickCard}
      />
      <div className="card__element">
        <h2 className="card__title">{name}</h2>
        <div className="card__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;