import React from "react";

function ImagePopup({ card, onClose }) {    
    return (
        <div className={`popup popup-photo ${card.link ? 'popup_opened' : ''}`}>
            <div className="popup-photo__container">
                <img src={card.link} className="popup-photo__link" alt={card.name} />
                <h2 className="popup-photo__title">{card.name}</h2>
                <button className="popup__close-button popup-photo__close-button" onClick={onClose} type="button" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}
export default ImagePopup;