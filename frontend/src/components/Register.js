import React, { useState } from 'react';
import * as authMesto from '../utils/AuthMesto';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthForm from './AuthForm';

function Register({ onRegister, infoTooltipSuccess, infoTooltipFail }) {
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

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formValue;

        authMesto.register({ email, password })
            .then((data) => {
                localStorage.setItem(data.email, data.password, data._id);
                onRegister(true);
                infoTooltipSuccess();
            })
            .catch(() => infoTooltipFail());
    }

    function handleEnter() {
        navigate("/signin");
    }

    return (
        <>
            <Header onSignOut={handleEnter} buttonText={'Войти'} />
            <AuthForm handleSubmit={handleSubmit}
                textTitle={'Регистрация'}
                email={formValue.email}
                handleChange={handleChange}
                password={formValue.password}
                onClick={onRegister}
                handleEnter={handleEnter}
                buttonText={'Зарегистрироваться'}
                buttonTextEnter={'Уже зарегистрированы? Войти'} />
        </>
    )
}
export default Register;