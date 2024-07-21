import "./index.css";
import { initialCards } from "./components/cards";
import { createCard, handleRemoveCard, handleLikeCard } from "./components/card";
import { handleOpenPopup, handleClosePopup } from "./components/modal";

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

profileEditButton.addEventListener("mouseup", () => {
  const titleText = profileTitle.textContent;
  const descriptionText = profileDescription.textContent;

  editNameInput.value = titleText;
  editDescriptionInput.value = descriptionText;

  handleOpenPopup(popupTypeEdit);
});

profileAddButton.addEventListener("mouseup", () => {
  handleOpenPopup(popupTypeNewCard);
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = editNameInput.value;
  const descriptionValue = editDescriptionInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  handleClosePopup(e);
});

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardElement = {
    name: cardName,
    link: cardLink,
  };

  placesList.prepend(createCard(cardElement, handleRemoveCard, handleLikeCard, handleOpenPopup));

  cardNameInput.value = "";
  cardLinkInput.value = "";

  handleClosePopup(e);
});

initialCards.map((item) => {
  placesList.append(createCard(item, handleRemoveCard, handleLikeCard, handleOpenPopup));
});
