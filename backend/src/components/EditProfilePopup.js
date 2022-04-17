import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import PopupWithForm from "./PopupWithForm";
import {
  CurrentUserContext
} from '../contexts/CurrentUserContext.js';

const EditProfilePopup = ({
    isOpen,
    onClose,
    onUpdateUser
  }) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleChangeName = (evt) => {
      setName(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
      setDescription(evt.target.value);
    }

    const handleSubmit = (e) => {

      e.preventDefault();
      onUpdateUser({
        name,
        about: description,
      });
    }

    return( 
      <PopupWithForm
            title={"Редактировать профиль"}
            name={"type_edit"}
            textBtn={"Сохранить"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >

        <input value={name || ''} onChange={handleChangeName} name="name" id="popup-name" className="popup__item popup__item_type_name" type="text" placeholder="Имя"
                minLength="2" maxLength="40" required/>
        <span id="popup-name-error" className="popup__item-error"/>
        <input value={description || ''} onChange={handleChangeDescription} name="prof" id="popup-job" className="popup__item popup__item_type_job" type="text"
                placeholder="Вид деятельности" minLength="2" maxLength="200" required/>
        <span id="popup-job-error" className="popup__item-error"/>
      </PopupWithForm>
    )
}

export default EditProfilePopup;