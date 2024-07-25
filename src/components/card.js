const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardElement, onDelete, onLike, onOpen) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  card.querySelector(".card__title").textContent = cardElement.name;

  card.querySelector(".card__delete-button").addEventListener("click", onDelete);
  card.querySelector(".card__like-button").addEventListener("click", onLike);
  cardImage.addEventListener("click", () => onOpen(cardElement.link, cardElement.name));

  return card;
};

const removeCard = (e) => {
  e.target.closest(".card").remove();
};

const likeCard = (e) => {
  e.target.classList.toggle("card__like-button_is-active");
};

export { createCard, removeCard, likeCard };
