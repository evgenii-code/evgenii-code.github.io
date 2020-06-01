'use strict';

class UserInfo {
  constructor(usernameElem, jobElem) {
    this.usernameElem = usernameElem;
    this.jobElem = jobElem;
  }

  setUserInfo(username, job) {
    this.username = username;
    this.job = job;
  }

  updateUserInfo() {
    this.usernameElem.textContent = this.username;
    this.jobElem.textContent = this.job;
  }
}