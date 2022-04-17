import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.card);
    props.onClose();
  }

  return (
    <PopupWithForm
      title={"Вы уверены?"}
      name={"type_delete"}
      textBtn={"Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  )

}

export default DeleteCardPopup;