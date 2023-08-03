import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }
    return (
        <PopupWithForm
            title={'Обновить аватар'}
            name={'avatar'}
            buttonText={'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input src=" " ref={avatarRef} className="popup__input popup-avatar__link" type="url" id="input-link-avatar" name="link"
                placeholder="Ссылка на аватар" required />
            <span className="popup__error input-link-avatar-error" id="input-link-avatar-error"></span>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;