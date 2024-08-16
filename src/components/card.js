import { deleteCard, addLike, removeLike } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardElement, userId, onDelete, onLike, onOpen) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardLikeButton = card.querySelector(".card__like-button");

  if (cardElement.likes.some((like) => like._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", (e) => onLike(e, cardElement._id));
  card.querySelector(".card__title").textContent = cardElement.name;
  card.querySelector(".card__like-counter").textContent = cardElement.likes.length;
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  cardImage.addEventListener("click", () => onOpen(cardElement.link, cardElement.name));

  if (cardElement.owner._id === userId) {
    cardDeleteButton.addEventListener("click", (e) => onDelete(e, cardElement._id));
  } else {
    cardDeleteButton.remove();
  }

  return card;
};

const removeCard = (e, id) => {
  deleteCard(id);
  e.target.closest(".card").remove();
};

const likeCard = (e, id) => {
  const currentCard = e.target.closest(".card");
  if (e.target.classList.contains("card__like-button_is-active")) {
    e.target.classList.remove("card__like-button_is-active");
    removeLike(id).then((cardData) => {
      currentCard.querySelector(".card__like-counter").textContent = cardData.likes.length;
    });
  } else {
    e.target.classList.add("card__like-button_is-active");
    addLike(id).then((cardData) => {
      currentCard.querySelector(".card__like-counter").textContent = cardData.likes.length;
    });
  }
};

export { createCard, removeCard, likeCard };
