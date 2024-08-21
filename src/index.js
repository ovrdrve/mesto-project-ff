import "./index.css";
import { createCard, removeCard, likeCard } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { clearValidation, enableValidation, validationConfig } from "./components/validation";
import {
  getInitialCards,
  getUserData,
  updateUserData,
  postNewCard,
  updateUserAvatar,
  getUrlContentType,
} from "./components/api";

const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatarButton = document.querySelector(".profile__avatar-edit");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const editNameInput = document.querySelector(".popup__input_type_name");
const editDescriptionInput = document.querySelector(".popup__input_type_description");
const editForm = popupTypeEdit.querySelector(".popup__form");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const cardForm = popupTypeNewCard.querySelector(".popup__form");

const popupTypeAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarLinkInput = document.querySelector(".popup__input_type_avatar");
const avatarForm = popupTypeAvatar.querySelector(".popup__form");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const openCardImagePopup = (link, name) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(popupTypeImage);
};

const renderLoading = (formElement, isLoading) => {
  const formButton = formElement.querySelector(".popup__button");
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
};

profileEditButton.addEventListener("mouseup", () => {
  editNameInput.value = profileTitle.textContent;
  editDescriptionInput.value = profileDescription.textContent;

  clearValidation(editForm, validationConfig);
  openPopup(popupTypeEdit);
});

profileAddButton.addEventListener("mouseup", () => {
  clearValidation(cardForm, validationConfig);
  openPopup(popupTypeNewCard);
});

profileAvatarButton.addEventListener("mouseup", () => {
  clearValidation(avatarForm, validationConfig);
  openPopup(popupTypeAvatar);
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  renderLoading(e.target, true);
  updateUserData(editNameInput.value, editDescriptionInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(e.target, false);
    });
});

cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  renderLoading(e.target, true);
  postNewCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      placesList.prepend(
        createCard(cardData, cardData.owner._id, removeCard, likeCard, openCardImagePopup)
      );
      cardForm.reset();
      closePopup(popupTypeNewCard);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(e.target, false);
    });
});

avatarForm.addEventListener("submit", (e) => {
  e.preventDefault();

  getUrlContentType(avatarLinkInput.value)
    .then((contentType) => {
      if (contentType === "image/jpeg" || "image/png") {
        renderLoading(e.target, true);
        updateUserAvatar(avatarLinkInput.value)
          .then((userData) => {
            cardForm.reset();
            closePopup(popupTypeAvatar);
            profileImage.style.backgroundImage = `url("${userData.avatar}")`;
          })
          .catch((err) => console.log(`Ошибка: ${err}`))
          .finally(() => {
            renderLoading(e.target, false);
          });
      } else {
        console.log("URL изображения не действителен");
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
});

Promise.all([getInitialCards(), getUserData()])
  .then(([cardsData, userData]) => {
    cardsData.forEach((item) => {
      placesList.append(createCard(item, userData._id, removeCard, likeCard, openCardImagePopup));
    });
    profileImage.style.backgroundImage = `url("${userData.avatar}")`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

enableValidation(validationConfig);
