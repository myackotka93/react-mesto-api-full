import React, { useEffect, useState } from 'react';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/api';
import DeleteCardPopup from './DeleteCardPopup';
import Avatar from './Avatar';
import Info from './Info';
import AddPlace from './AddPlace';
import ImagePopup from './ImagePopup';

const Main = ({  }) => {
  const { currentUser } = React.useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);
  const [isDeleteCardPopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardDelete(card) {
    console.log(card);
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`ошибка ${err}`);
      });
  }

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDeleteCard(card) {
    setSelectedCard(card);
    setIsDeletePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  return (
    <main className="main">
      <section className="profile">
        <Avatar />
        <Info />
        <AddPlace setCards={setCards} />
      </section>

      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => {
            return <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
            />
          })}
        </ul>
      </section>

      <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} card={selectedCard} onCardDelete={handleCardDelete} />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </main>
  );
}

export default Main;