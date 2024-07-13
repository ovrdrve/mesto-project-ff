import "./index.css";
import { initialCards } from "./scripts/cards";

const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

const createCard = (cardElement, callback) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");

  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  card.querySelector(".card__title").textContent = cardElement.name;
  card.querySelector(".card__delete-button").addEventListener("click", (e) => {
    callback(e);
  });

  return card;
};

console.log(111);

const removeCard = (e) => {
  e.target.closest(".card").remove();
};

initialCards.map((item) => {
  placesList.append(createCard(item, removeCard));
});
