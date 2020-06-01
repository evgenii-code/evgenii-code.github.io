'use strict';

class UserInfo {
  constructor(nameElem, aboutElem, avatarElem) {
    this.nameElem = nameElem;
    this.aboutElem = aboutElem;
    this.avatarElem = avatarElem;
  }

  setUserInfo({ name, about, avatar }) {
    this.username = name;
    this.job = about;
    this.avatar = avatar || this.avatar;

    this.updateUserInfo();
  }

  updateUserInfo() {
    this.nameElem.textContent = this.username;
    this.aboutElem.textContent = this.job;
    this.avatarElem.style.backgroundImage = `url(${this.avatar}`;
  }
}