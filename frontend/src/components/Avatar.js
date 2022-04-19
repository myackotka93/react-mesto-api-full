import React, { useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatar_edit_button from '../images/pen.svg';
import { api } from '../utils/api';
import EditAvatarPopup from './EditAvatarPopup';

function Avatar({ }) {
  const { currentUser, setCurrentUser } = React.useContext(CurrentUserContext);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function closePopup() {
    setIsEditAvatarPopupOpen(false);
  }

  function openPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  const handleUpdateAvatar = ({ avatar }) => {
    api.saveProfileAvatar(avatar)
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
      <button className="profile__avatar-button" type="button" onClick={openPopup}>
        <div className="profile__avatar-edit-button-container">
          <img className="profile__avatar-edit-button" src={avatar_edit_button} alt="Кнопка Редактировать" />
        </div>
        <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image profile__avatar" />
      </button>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closePopup}
        onUpdateAvatar={handleUpdateAvatar}
      />
    </>
  )
}

export default Avatar