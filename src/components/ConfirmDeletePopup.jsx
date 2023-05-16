import React from "react";

import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ isOpen, onClose, onDelete }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDelete();
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      buttonText={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletePopup;