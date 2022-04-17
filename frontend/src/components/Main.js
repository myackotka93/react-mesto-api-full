import React from 'react';
import avatar_edit_button from '../images/pen.svg';
import add_button_image from '../images/plus.svg';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) => {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
          <div className="profile__avatar-edit-button-container">
            <img className="profile__avatar-edit-button" src={avatar_edit_button} alt="Кнопка Редактировать" />
          </div>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-image profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}>
            <img src={avatar_edit_button} alt="Кнопка редактирования" className="profile__edit-button-image" />
          </button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}>
          <img className="profile__add-button-image" src={add_button_image} alt="Кнопка добавить" />
        </button>
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => {
            return <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          })}
        </ul>
      </section>

      
    </main>
  );
}

export default Main;