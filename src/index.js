import "./index.css";
import { initialCards } from "./components/cards";
import { createCard, removeCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { clearValidation, enableValidation, validationConfig } from "./components/validation";

const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const editNameInput = document.querySelector(".popup__input_type_name");
const editDescriptionInput = document.querySelector(".popup__input_type_description");
const editForm = popupTypeEdit.querySelector(".popup__form");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const cardForm = popupTypeNewCard.querySelector(".popup__form");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");

const openCardImagePopup = (link, name) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupTypeImage.querySelector(".popup__caption").textContent = name;

  openPopup(popupTypeImage);
};

profileEditButton.addEventListener("mouseup", () => {
  const titleText = profileTitle.textContent;
  const descriptionText = profileDescription.textContent;

  editNameInput.value = titleText;
  editDescriptionInput.value = descriptionText;

  console.log("pre clear")
  clearValidation(editForm, validationConfig);
  openPopup(popupTypeEdit);
});

profileAddButton.addEventListener("mouseup", () => {
  clearValidation(cardForm, validationConfig);
  openPopup(popupTypeNewCard);
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = editNameInput.value;
  const descriptionValue = editDescriptionInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closePopup(popupTypeEdit);
});

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardElement = {
    name: cardName,
    link: cardLink,
  };

  placesList.prepend(createCard(cardElement, removeCard, likeCard, openCardImagePopup));

  cardForm.reset();

  closePopup(popupTypeNewCard);
});

initialCards.forEach((item) => {
  placesList.append(createCard(item, removeCard, likeCard, openCardImagePopup));
});

enableValidation(validationConfig);
