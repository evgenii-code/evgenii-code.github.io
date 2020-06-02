'use strict';

class Card {
  // Можно лучше
  // externalMethod -- поди знай что он делает, я бы конечно его назвал
  // как-то более соответственно его функционалу.
  constructor(templateCard, cardData, externalMethod, cardSelectors) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.templateCard = templateCard;
    this.externalMethod = externalMethod;
    this.cardSelectors = cardSelectors;
  }

  like() {
    this.cardLikeButton.classList.toggle('place-card__like-icon_liked');
  }

  remove() {
    this.removeEventListeners();
    this.card.remove();
  }

  showPopup() {
    this.externalMethod(this.link);
  }

  create() {
    const card = this.templateCard.content.cloneNode(true);
    this.card = card.querySelector(this.cardSelectors.card);

    const cardName = card.querySelector(this.cardSelectors.cardName);
    const likeCount = card.querySelector(this.cardSelectors.cardLikeCount);
    likeCount.textContent = this.likes.length;
    
    this.cardBackground = card.querySelector(this.cardSelectors.cardBackground);

    cardName.textContent = this.name;
    this.cardBackground.setAttribute('style', `background-image: url(${this.link})`);
    this.cardBackground.dataset.imageLink = this.link;

    this.cardLikeButton = this.card.querySelector(this.cardSelectors.cardLikeButton);
    this.cardRemoveButton = this.card.querySelector(this.cardSelectors.cardRemoveButton);
    this.setEventlisteners();

    return card;
  }

  setEventlisteners() {
    this.likeBind = this.like.bind(this);
    this.removeBind = this.remove.bind(this);
    this.showPopupBind = this.showPopup.bind(this);

    this.cardLikeButton.addEventListener('click', this.likeBind);
    this.cardRemoveButton.addEventListener('click', this.removeBind);
    this.cardBackground.addEventListener('click', this.showPopupBind);
  }

  removeEventListeners() {
    this.cardLikeButton.removeEventListener('click', this.likeBind);
    this.cardRemoveButton.removeEventListener('click', this.removeBind);
    this.cardBackground.removeEventListener('click', this.showPopupBind);
  }
}