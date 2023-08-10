class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers
    }

    getUserProfileInfo(token) {        
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                ...this.headers,
                authorization: `Bearer ${token}`
            }
        })
            .then(res => this._errorCheck(res))
    }

    getCards(token) {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                ...this.headers,
                authorization: `Bearer ${token}`
            }
        })
            .then(res => this._errorCheck(res))
    }

    editUserInfo({ name, about }) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ name, about })
        })
            .then(res => this._errorCheck(res))
    }

    createCard({ name, link }) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'Post',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({ name, link })
        }).then(res => this._errorCheck(res))
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(res => this._errorCheck(res))
    };

    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(res => this._errorCheck(res))
    };
    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        }).then(res => this._errorCheck(res))
    };

    editAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
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
    baseUrl: 'https://api.mesto.elenavereskun.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;