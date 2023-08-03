import React from "react";

function AuthForm(props) {
    return (
        <div className='register'>
            <form className="register__form" onSubmit={props.handleSubmit}>
                <div className="register__container">
                    <h2 className="register__title">{props.textTitle}</h2>
                    <input value={props.email} className="register__email" onChange={props.handleChange} id="register-email"
                        type="text" name="email" placeholder="Email" required />
                    <input value={props.password} className="register__password" onChange={props.handleChange} id="current-password"
                        type="password" name="password" placeholder="Пароль" required />                       
                    <p className="register__error">{props.errorMessage}</p>
                    <button className="register__button-register" onClick={props.onClick}>{props.buttonText}</button>
                    <button className="register__button-enter" onClick={props.handleEnter}>{props.buttonTextEnter}</button>
                </div>
            </form>
        </div>
    )
}
export default AuthForm;