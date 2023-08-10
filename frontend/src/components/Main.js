import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
/* import * as authMesto from '../utils/AuthMesto'; */
import { useNavigate } from "react-router-dom";

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards,
    setEmail,
    setIsLoggedIn
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const navigate = useNavigate();

    function onSignOut() {
        localStorage.removeItem('token');
        navigate('/signin', { replace: true });
        setIsLoggedIn(false);
    }
    return (
        <>
            <Header buttonText={'Выйти'} onSignOut={onSignOut} setEmail={setEmail} />
            <main className="page">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__photo">
                            <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.avatar} />
                            <button className="profile__edit-avatar" onClick={onEditAvatar}></button>
                        </div>
                        <div className="profile__user-name">
                            <div className="profile__user-edit">
                                <h1 className="profile__name">{currentUser.name}</h1>
                                <button className="profile__edit-button" onClick={onEditProfile}></button>
                            </div>
                            <p className="profile__job">{currentUser.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button" onClick={onAddPlace}>
                        <div className="profile__add-button-centre"></div>
                    </button>
                </section>
                <div>
                    <ul className="elements">
                        {cards.map((card) => (
                            <Card card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete={onCardDelete}
                                key={card._id}>
                            </Card>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}
export default Main;
