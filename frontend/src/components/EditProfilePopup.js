import React from 'react';
import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = React.useContext(CurrentUserContext);

    // Обработчик изменения инпута обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    useEffect(() => {
        setName(currentUser.name ?? "");
        setDescription(currentUser.about ?? "");
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            title={'Редактировать профиль'}
            name={'prifile'}
            buttonText={'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input onChange={handleChangeName} value={name} className="popup-profile__user popup-profile__user_info_name popup__input" id="input-name"
                type="text" name="name" placeholder="Имя пользователя" required />
            <span className="popup__error input-name-error" id="input-name-error"></span>
            <input onChange={handleChangeDescription} value={description} className="popup-profile__user popup-profile__user_info_job popup__input" id="input-job" type="text"
                name="job" placeholder="Род деятельности" required />
            <span className="popup__error input-job-error" id="input-job-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;

