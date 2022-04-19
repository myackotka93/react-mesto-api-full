import React, { useState } from 'react'
import add_button_image from '../images/plus.svg';
import { api } from '../utils/api';
import AddPlacePopup from './AddPlacePopup';

function AddPlace({ setCards }) {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  function closePopup() {
    setIsAddPlacePopupOpen(false);
  }

  function openPopup() {
    setIsAddPlacePopupOpen(true);
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.createCard(name, link)
      .then((data) => {
        setCards(cards => [data, ...cards]);
        closePopup();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  return (
    <>
      <button type="button" className="profile__add-button" onClick={openPopup}>
        <img className="profile__add-button-image" src={add_button_image} alt="Кнопка добавить" />
      </button>

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopup} onAddPlace={handleAddPlaceSubmit} />
    </>
  )
}

export default AddPlace