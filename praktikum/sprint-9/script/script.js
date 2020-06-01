'use strict';

const root = document.querySelector('.root');

const usernameElem = root.querySelector('.user-info__username');
const jobElem = root.querySelector('.user-info__job');

const userInfo = new UserInfo(usernameElem, jobElem);

const addPopupElem = root.querySelector('#popup-add');
const addPopupCloseButton = addPopupElem.querySelector('.popup__close');

const editPopupElem = root.querySelector('#popup-edit');
const editPopupCloseButton = editPopupElem.querySelector('.popup__close');

const imagePopupElem = root.querySelector('#popup-pic');
const imagePopupCloseButton = imagePopupElem.querySelector('.popup__close');

const templateCard = root.querySelector('.card-template');
const placesList = root.querySelector('.places-list');

const editUserInfoButton = root.querySelector('.user-info__edit-button');
const editForm = document.forms.edit;

const addCardButton = root.querySelector('.user-info__button');
const addForm = document.forms.add;

const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Здесь должна быть ссылка'
};

const popupAddButton = addForm.elements.addButton;
const addFormValidator = new FormValidator(addForm, errorMessages);
addFormValidator.setEventListeners(popupAddButton);

const popupEditButton = editForm.elements.editButton;
const editFormValidator = new FormValidator(editForm, errorMessages);
editFormValidator.setEventListeners(popupEditButton);

const cards = [];

const fillUpPopup = function () {
  const inputs = this.popup.querySelectorAll('.popup__input');

  Array.from(inputs).forEach(input => {
    input.value = userInfo[input.name];
  });
  editFormValidator.clearErrors();
  editFormValidator.setSubmitButtonState();
}

const clearForm = function () {
  const inputs = this.popup.querySelectorAll('.popup__input');

  Array.from(inputs).forEach(input => {
    input.value = '';
  })

  addFormValidator.clearErrors();
  addFormValidator.setSubmitButtonState();
}

const getImage = function (value) {
  // Можно лучше
  // pictureContainer -- он же не меняется, поэтому его вообще стоит 1 раз получить и пользоваться,
  // а не искать заново при каждом коллбэке
  const pictureContainer = this.popup.querySelector('.popup__picture');
  pictureContainer.src = value;
}

const addPopup = new Popup(addPopupElem, addPopupCloseButton, clearForm, addCardButton);
const editPopup = new Popup(editPopupElem, editPopupCloseButton, fillUpPopup, editUserInfoButton);
const imagePopup = new PopupImage(imagePopupElem, imagePopupCloseButton, getImage);
const externalMethod = imagePopup.openPopup.bind(imagePopup);

const cardSelectors = {
  card: '.place-card',
  cardName: '.place-card__name',
  cardBackground: '.place-card__image',
  cardLikeButton: '.place-card__like-icon',
  cardRemoveButton: '.place-card__delete-icon',
}

userInfo.setUserInfo('Jaques Causteau', 'Sailor, Researcher');
userInfo.updateUserInfo(usernameElem, jobElem);
userInfo.updateUserInfo();

initialCards.forEach(cardData => {
  const newCard = new Card({ templateCard, cardData, externalMethod, cardSelectors });
  const cardToAppend = newCard.create();
  cards.push(cardToAppend);
});

const cardList = new CardList({ placesList, cards });
cardList.render();

function getInputValue(form) {
  const inputs = form.querySelectorAll('.popup__input');

  const result = {};

  Array.from(inputs).forEach(input => {
    result[input.name] = input.value;
  });

  return result;
}

function submitAddCard(event) {
  event.preventDefault();

  const cardData = getInputValue(event.target);
  const newCard = new Card({ templateCard, cardData, externalMethod, cardSelectors });

  cardList.addCard(newCard.create());

  addPopup.closePopup();
}

function submitUserInfo(event) {
  event.preventDefault();
  const form = event.target;

  const username = form.elements.username.value;
  const job = form.elements.job.value;

  userInfo.setUserInfo(username, job)
  userInfo.updateUserInfo(usernameElem, jobElem);

  editPopup.closePopup();
}

addForm.addEventListener('submit', submitAddCard);
editForm.addEventListener('submit', submitUserInfo);

// Добрый день!

// Хорошая, и, главное, хорошо читаемая и лаконичная работа.
// Работать с вами было большим удовольствием.

// ## Итог
// - Использованы ES6-классы.
// - В классах напрямую не создаются экземпляры других классов.
// - Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в классе.
// - Делегирование больше не используется. Обработчики добавлены именно тем элементам, события которых нужно отслеживать.
// - Ненужные обработчики удаляются.
// - Каждый класс описан в отдельном JS-файле.

// Работа принята, успехов в учебе!