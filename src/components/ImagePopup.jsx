//import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_increase-card ${card ? 'popup_is-opened' : ''}`}>
      <figure className='popup__container popup__container_type_increase'>
        <button 
          onClick={onClose}
          className='popup__close-button popup__close-button_type_increase'
          aria-label='Закрыть окно'
          type='button'>
        </button>
        <img 
          src={card ? card.link : '#'}
          className='popup__img'
          alt={card ? card.name : ''}
        />
        <figcaption className='popup__img-name'>{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;