'use strict';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  fetchData(attribute, init = { headers: this.headers }) {
    const url = this.baseUrl + attribute;

    return fetch(url, init)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`${err}`))
  }

  getInitialCards(attribute, callback) {
    this.fetchData(attribute).then((result) => {
      callback(result);
    });
  }

  getUserInfo(attribute, callback) {
    this.fetchData(attribute).then((result) => {
      callback(result);
    });
  }

  setUserInfo(attribute, callback, name, about) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    }

    this.fetchData(attribute, init).then((result) => {
      callback(result);
    });
  }

  setNewCard(attribute, callback, name, link) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'POST',
      body: JSON.stringify({ name, link })
    }

    this.fetchData(attribute, init).then((result) => {
      callback(result);
    });
  }

  toggleLike(attribute, callback, isLiked = true) {
    const init = {
      headers: this.headers,
      method: isLiked ? 'PUT' : 'DELETE',
    }

    this.fetchData(attribute, init).then((result) => {
      callback(result);
    });
  }
}