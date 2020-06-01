'use strict';

class UserInfo {
  constructor(nameElem, aboutElem, avatarElem) {
    this.nameElem = nameElem;
    this.aboutElem = aboutElem;
    this.avatarElem = avatarElem;
  }

  setUserInfo({ name, about, avatar }) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;

    this.updateUserInfo();
  }

  updateUserInfo() {
    this.nameElem.textContent = this.name;
    this.aboutElem.textContent = this.about;
    this.avatarElem.style.backgroundImage = `url(${this.avatar}`;
  }
}