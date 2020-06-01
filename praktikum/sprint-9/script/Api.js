'use strict';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards(attribute, callback) {
    this.fetchData(attribute).then((result) => {
      callback(result);
    });
  }

  getUserInfo(attribute, callback) {
    this.fetchData(attribute).then((result) => {
      const { name, about, avatar } = result;

      callback({ name, about, avatar });
    });
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

  setUserInfo(attribute, callback, name, about) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    }

    this.fetchData(attribute, init).then((result) => {
      const { name, about, avatar } = result;

      callback({ name, about, avatar });
    });
  }

  // другие методы работы с API
}