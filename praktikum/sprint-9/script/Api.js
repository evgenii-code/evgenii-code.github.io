'use strict';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    // ...
  }

  getUserInfo(attribute, method = 'GET', callback) {
    this.fetchData(attribute, method).then((result) => {
      console.log(result);
    });
  }

  fetchData(attribute, method) {
    const url = this.baseUrl + attribute;
    const init = { 
      headers: this.headers,
      method,
    };

    return fetch(url, init)
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`${err}`))
  }

  // другие методы работы с API
}