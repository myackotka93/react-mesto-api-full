import React, {useState} from 'react';
import PopupWithForm from '../components/PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeLink = (evt) => {
        setLink(evt.target.value);
    }

    const handleSubmit = (e) => {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          name, link          
        });
}

  return(
    <PopupWithForm
    title={"Новое место"}
    name={"type_add"}
    textBtn={"Создать"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
  >
    <input value={name || ''} onChange={handleChangeName} name="name" id="popup-place" className="popup__item popup__item_type_place" type="text"
          placeholder="Название" minLength="2" maxLength="40" required/>
    <span id="popup-place-error" className="popup__item-error"/>
    <input value={link || ''} onChange={handleChangeLink} name="link" id="popup-image" className="popup__item popup__item_type_image" type="url" pattern="https?://.+"
          placeholder="Ссылка на картинку" required/>
    <span id="popup-image-error" className="popup__item-error"/>
  </PopupWithForm>
  )
}

export default AddPlacePopup;