import React from 'react';
import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { name, link, likes } = card;
  const currentUser = React.useContext(CurrentUserContext);
  const [count, setCount] = useState(likes.length);

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
    if (isLiked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  // Определяем, являемся ли мы владельцем текущей карточки  
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  )

  return (
    <li className="element">
      <div className="element__image">
        <button
          className={isOwn ? 'element__delete' : 'element__delete_none'}
          onClick={handleDeleteClick}>
        </button>
        <img src={link} className="element__link" alt={name} onClick={handleClick} />
      </div>
      <div className="element__caption">
        <h2 className="element__title">{name}</h2>
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}></button>
          <p className="element__like-count">{count}</p>
        </div>
      </div>
    </li>
  )
}
export default Card;