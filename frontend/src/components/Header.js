import React from "react";
function Header({ onSignOut, buttonText, setEmail }) {
    return (
        <header className="header">
            <div className="header__container" >
                <div className="header__logo"></div>
                <div className="header__button">
                    <p className="header__email">{setEmail}</p>
                    <button className="header__enter" onClick={onSignOut}>{buttonText}</button>
                </div>
            </div>
        </header>
    )
}
export default Header;