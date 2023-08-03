export const BASE_URL = "https://auth.nomoreparties.co";

function errorCheck(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ password, email }),
    })
        .then((res) => {
            return res
        })
        .then(res => errorCheck(res))
};

export const authorize = ({email, password}) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then(res => errorCheck(res))
};
export const getToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('jwt')}`
        }
    })
        .then(res => errorCheck(res))
}