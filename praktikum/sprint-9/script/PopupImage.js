class PopupImage extends Popup {
  // Можно лучше
  // конструктор, который только вызывет super -- не нужен
  constructor(popup, closeButton, callBack) {
    super(popup, closeButton, callBack);
  }

  setEventListeners() {
    this.closeButton.addEventListener('click', this.closePopup.bind(this));
  }
}