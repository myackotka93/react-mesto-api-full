import React from 'react';

const PopupWithForm = ({ title, name, children, isOpen, textBtn, onClose, onSubmit }) => {
  const popupIsVisible = isOpen ? 'popup_opened' : '';
  
  return (
    <section className={`popup popup_${name} ${popupIsVisible}`}>
      <div className="popup__area popup__close" onClick={onClose}></div>
      <div className="popup__container">
        <form className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save-button" type="submit">{textBtn}</button>
          <button className="popup__close-button popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;