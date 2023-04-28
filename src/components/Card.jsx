//создание и функционирование карточки
//import React from 'react';

function  Card ({ onCardClick, link, name, likes }) {

  function handleClickCard() {
    onCardClick({ link, name });
  }

  return (
    <article className="card">
      <button
        className="card__delete-button"
        type="button"
        aria-label="Удалить"
      />
      <img
        onClick={handleClickCard}
        className="card__image"
        src={link}
        alt={name}
      />
      <div className="card__element">
        <h2 className="card__title">{name}</h2>
        <div className="card__like">
          <button
            className="card__like-button"
            type="button"
            aria-label="Лайк"
          />
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </article>
  );
};

export default Card;