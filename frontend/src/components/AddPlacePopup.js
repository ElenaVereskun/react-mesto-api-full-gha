import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');
    function handleChangePlace(e) {
        setPlace(e.target.value);
    }
    function handleChangeLink(e) {
        setLink(e.target.value);
    }
    useEffect(() => {
        setPlace('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: place,
            link: link,
        });
    }
    return (
        <PopupWithForm
            title={'Новое место'}
            name={'add'}
            isOpen={isOpen}
            onClose={onClose}
            buttonText={'Создать'}
            onSubmit={handleSubmit}>
            <input className="popup__input popup-add__place"
                onChange={handleChangePlace}
                value={place} type="text"
                id="input-place"
                name="name"
                placeholder="Название" required />
            <span className="popup__error input-place-error"
                id="input-place-error"></span>
            <input className="popup__input popup-add__link"
                onChange={handleChangeLink}
                value={link} type="url" id="input-link" name="link"
                placeholder="Ссылка на картинку" required />
            <span className="popup__error input-link-error" id="input-link-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup;