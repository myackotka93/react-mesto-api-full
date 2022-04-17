import React from 'react';
import delete_svg from "../images/delete.svg";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `card__button-delete ${isOwn ? '' : 'card__button-delete-hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__button-like ${isLiked ? 'card__button-like_active' : ''}`;

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
        <img className="card__delete" src={delete_svg} alt="Удалить" />
      </button>
      <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
      <div className="card__discription">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;