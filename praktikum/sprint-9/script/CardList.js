'use strict';

class CardList {
  constructor({ placesList, cards }) {
    this.placesList = placesList;
    this.cards = cards;
  }

  addCard(card) {
    this.placesList.appendChild(card);
  }

  render() {
    this.cards.forEach((card) => {
      this.placesList.appendChild(card);
    })
  }
}