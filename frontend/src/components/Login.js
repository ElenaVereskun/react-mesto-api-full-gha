import { useState } from "react";
import React from 'react';
import * as authMesto from './../utils/AuthMesto';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";

function Login({ onLogin, setIsLoggedIn, infoTooltipFail, setEmail }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const navigate = useNavigate();
    const [errorMessage, setErrorMesage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            setErrorMesage("Не введены email или пароль");
            return;
        }
        authMesto.authorize({ email: formValue.email, password: formValue.password })
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setFormValue({ email: '', password: '' });
                    onLogin(data.token);
                    setEmail(data.email);
                    setIsLoggedIn(true);
                    navigate('/main', { replace: true });
                } else {
                    setErrorMesage("Не корректные email или пароль")
                }
            })
            .catch((err) => infoTooltipFail());
    }
    function handleRegister() {
        navigate("/signup");
    }
    return (
        <>
            <Header onSignOut={handleRegister} buttonText={'Регистрация'} />
            <AuthForm handleSubmit={handleSubmit}
                textTitle={'Вход'}
                email={formValue.email}
                handleChange={handleChange}
                password={formValue.password}
                onClick={onLogin}
                buttonText={'Войти'}
                errorMessage={errorMessage} />
        </>
    )
}
export default Login;