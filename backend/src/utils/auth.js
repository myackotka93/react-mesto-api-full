class Auth {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  signin(password, email) {
    return fetch(`${this._url}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => this._checkResponse(res))
  }

  signup(password, email) {
    return fetch(`${this._url}/signup`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => this._checkResponse(res))
  };



  getContent(token) {
    return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => this._checkResponse(res))
  }
}

const auth = new Auth('https://auth.nomoreparties.co');
export default auth;