import React, {useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

    const linkRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: linkRef.current.value,
        });
      } 

      return(
        <PopupWithForm
        title={"Обновить аватар"}
        name={"type_avatar"}
        textBtn={"Сохранить"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <input ref={linkRef} name="avatar" id="user-avatar" className="popup__item popup__item_type_card-name"
              placeholder="Ссылка на картинку" type="url" required/>
        <span id="user-avatar-error" className="popup__item-error"/>
      </PopupWithForm>
      )
}

export default EditAvatarPopup;