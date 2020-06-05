'use strict';

class CardList {
  constructor({ placesList }) {
    this.placesList = placesList;
    // this.cards = cards;
  }

  addCard(card) {
    this.placesList.appendChild(card);
  }

  render(cards) {
    this.cards = cards;
    
    this.cards.forEach((card) => {
      this.placesList.appendChild(card);
    })
  }
}