class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers
    }
    //1. Загрузка информации о пользователе с сервера
    getUserProfileInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            credentials: "include",
            headers: this.headers
        })
            .then(res => this._errorCheck(res))
    }
    //2. Загрузка карточек с сервера
    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            credentials: "include",
            headers: this.headers
        })
            .then(res => this._errorCheck(res))
    }
    //3. Редактирование профиля
    editUserInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            credentials: "include",
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ name, about })
        })
            .then(res => this._errorCheck(res))
    }
    //4. Добавление новой карточки
    createCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            credentials: "include",
            method: 'Post',
            headers: this.headers,
            body: JSON.stringify({ name, link })
        }).then(res => this._errorCheck(res))
    }
    //7. Удаление карточки
    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        }).then(res => this._errorCheck(res))
    };

    //8. Постановка и снятие лайка
    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this.headers
        }).then(res => this._errorCheck(res))
    };
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this.headers
        }).then(res => this._errorCheck(res))
    };
    //9. Обновление аватара пользователя
    editAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        }).then(res => this._errorCheck(res))
    }
    _errorCheck(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}

const api = new Api({
    baseUrl: 'http://api.mesto.elenavereskun.nomoreparties.co',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
});

export default api;