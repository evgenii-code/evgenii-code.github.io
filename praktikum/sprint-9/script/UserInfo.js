'use strict';

class UserInfo {
  constructor(nameElem, aboutElem, avatarElem, userData) {
    this.nameElem = nameElem;
    this.aboutElem = aboutElem;
    this.avatarElem = avatarElem;
    this.userData = userData;
  }

  setUserInfo(result) {
    this.username = result.name;
    this.job = result.about;
    this.avatar = result.avatar || this.avatar;

    Object.assign(this.userData, result);

    this.updateUserInfo();
  }

  updateUserInfo() {
    this.nameElem.textContent = this.username;
    this.aboutElem.textContent = this.job;
    this.avatarElem.style.backgroundImage = `url(${this.avatar}`;
  }
}