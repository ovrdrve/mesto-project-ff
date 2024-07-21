const cardTemplate = document.querySelector("#card-template").content;

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");

const createCard = (cardElement, onDelete, onLike, onOpen) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  card.querySelector(".card__title").textContent = cardElement.name;

  card.querySelector(".card__delete-button").addEventListener("click", onDelete);
  card.querySelector(".card__like-button").addEventListener("click", onLike);
  cardImage.addEventListener("click", () => {
    popupImage.src = cardElement.link;
    popupImage.alt = cardElement.name;
    popupTypeImage.querySelector(".popup__caption").textContent = cardElement.name;

    onOpen(popupTypeImage);
  });

  return card;
};

const handleRemoveCard = (e) => {
  e.target.closest(".card").remove();
};

const handleLikeCard = (e) => {
  e.target.classList.toggle("card__like-button_is-active");
};

export { createCard, handleRemoveCard, handleLikeCard };
