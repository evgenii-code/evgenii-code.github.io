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
      // Этот catch возвращает не объект ошибки, а undefined
      // Если даже отключить сеть, то коллбэк в точке вызова сработает
      // и в колсоль полетят ошибки
      // Если внутри Api есть catch, то он должен возвращать либо
      // объект ошибки, либо Promise.reject
  }

  getInitialCards(attribute) {
    return this.fetchData(attribute);
  }

  getUserInfo(attribute) {
    return this.fetchData(attribute)
  }

  setUserInfo(attribute, name, about) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    }

    return this.fetchData(attribute, init);
  }

  setNewCard(attribute, name, link) {
    const init = {
      headers: this.headers,
      'Content-Type': 'application/json',
      method: 'POST',
      body: JSON.stringify({ name, link })
    }

    return this.fetchData(attribute, init);
  }

  toggleLike(attribute, isLiked = true) {
    const init = {
      headers: this.headers,
      method: isLiked ? 'PUT' : 'DELETE',
    }

    return this.fetchData(attribute, init);
  }

  removeCard(attribute) {
    const init = {
      headers: this.headers,
      method: 'DELETE',
    }

    return this.fetchData(attribute, init);
  }
}

//Надо исправить
// Вы раелизовали класс с использованием коллбэков -- такая практика существует, но в данном случае
// она нежелательна и все усложняет. Api -- это класс работы с сервером, он должен к севрверу обратиться,
// получить данные, обработать их как-то, и вернуть. Кроме того, коллбэк -- это лишняя зависимость класса,
// и у вас их много.
// Следует из метода класса APi возвращать промис и принимать его в точке вызова метода класса.               +

// Catch в методе Api должен либо пробрасывать ошибку через throw, либо возвращать промис с ошибкой,
// потому что в месте вызова метода должно быть четко понятно, что вернул Api -- успешный ответ или ошибку.
// Полученный ответ от метода экземпляра Api тоже нужно принять через then и catch.
// Допустим у вас есть метод Api:
// ~~~
// someApiMethod() {
//   return fetch(...)
//           .then(...)
//           .catch(...) // возвращает reject
// }
// ~~~
// В точке вызова действуем так:                                                                  +
// ~~~
// api.someApiMethod()
//   .then(... что-то рисуем, меняем, закрываем)
//   .catch(... ничего не меняем, не закрываем, сообщаем об ошибке)
// ~~~

// Также надо исправить
// Нельзя менять данные на странице до того как сервер вернул ответ. Сначала надо убедиться,      +
// что сервер вернул положительный результат, потом менять DOM. То же самое касается и окон
// попапов -- после сабмита формы сначала опрашиваем сервер, получаем подтверждение операции
// и только потом попап закрываем и вносим изменения в DOM. Именно поэтому использовать промисы
// будет значительно удобнее.

// Протестируйте такой кейс: загрузите страницу, отключите сеть, попробуйте изменить данные       +
// пользователя. Попап не должен закрыться, данные на странице поменяться не должны.