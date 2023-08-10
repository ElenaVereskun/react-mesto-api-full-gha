import React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Main from './Main';
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import * as authMesto from '../utils/AuthMesto';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import fail from '../images/fail.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const [email, setEmail] = useState(' ');

  const navigate = useNavigate();

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    isLoggedIn &&
      Promise.all([api.getUserProfileInfo(token), api.getCards(token)])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(`Ошибка загрузки данных профиля: ${err}`))
  }, [isLoggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(`Ошибка добавления лайка: ${err}`));
    } else {
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(`Ошибка удаления лайка: ${err}`));
    }
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка удаления карточки: ${err}`));
  }
  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка изменения данных пользователя: ${err}`));
  }
  function handleUpdateAvatar(newAvatar) {
    api.editAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка изменения фото аватара: ${err}`));
  }
  function handleAddPlaceSubmit({ name, link }) {
    api.createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка добавления новой карточки: ${err}`));
  }

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authMesto.getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.email);
            navigate("/main", { replace: true });
          }
        })
        .catch((err) => console.log(`Ошибка получения токена: ${err}`));
    }
  }
  function handleEmail() {
    setEmail(email);
  }

  const [errorText, setErrorText] = useState(' ');
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipImg, setInfoTooltipImg] = useState();

  function infoTooltipSuccess() {
    setErrorText('Вы успешно зарегистрировались!');
    setInfoTooltipOpen(true);
    setInfoTooltipImg(success);
  }

  function infoTooltipFail() {
    setErrorText('Что-то пошло не так! Попробуйте ещё раз.');
    setInfoTooltipOpen(true);
    setInfoTooltipImg(fail);
  }

  function onClickCloseButton() {
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser} className="content" >
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
      <InfoTooltip
        infoTooltipOpen={infoTooltipOpen}
        text={errorText}
        infotooltipimg={infoTooltipImg}
        onClickCloseButton={onClickCloseButton} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/signin" replace />} />
        <Route path='/main' element={<ProtectedRoute element={<Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          setEmail={email}
          setIsLoggedIn={setIsLoggedIn}
        />} isLoggedIn={isLoggedIn} />} />
        <Route path='/signin' element={<Login
          onLogin={handleEmail}
          setEmail={setEmail}
          setIsLoggedIn={setIsLoggedIn}
          infoTooltipFail={infoTooltipFail} />} />
        <Route path='/signup' element={<Register
          onRegister={setIsLoggedIn}
          infoTooltipSuccess={infoTooltipSuccess}
          infoTooltipFail={infoTooltipFail} />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}
export default App;
