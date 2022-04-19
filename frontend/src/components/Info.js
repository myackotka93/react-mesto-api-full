import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatar_edit_button from '../images/pen.svg';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';

function Info({ }) {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function closePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function openPopup() {
    setIsEditProfilePopupOpen(true);
  }

  const handleUpdateUser = ({ name, about }) => {
    api.saveProfile(name, about)
      .then((data) => {
        setCurrentUser(data);
        closePopup();
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      })
  }

  return (
    <>
      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <button type="button" className="profile__edit-button" onClick={openPopup}>
          <img src={avatar_edit_button} alt="Кнопка редактирования" className="profile__edit-button-image" />
        </button>
        <p className="profile__subtitle">{currentUser.about}</p>
      </div>


      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closePopup}
        onUpdateUser={handleUpdateUser}
      />
    </>
  )
}

export default Info