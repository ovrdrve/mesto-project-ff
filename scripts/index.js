const cardTemplate = document.querySelector("#card-template").content;

const placesList = document.querySelector(".places__list");

const addCard = (cardElement, callback) => {
  const card = cardTemplate.querySelector(".card").cloneNode(true);

  card.querySelector(".card__image").src = cardElement.link;
  card.querySelector(".card__title").textContent = cardElement.name;
  card.querySelector(".card__delete-button").addEventListener("click", (e) => {
    removeCard(e);
  });

  placesList.append(card);
};

const removeCard = (e) => {
  e.target.closest(".card").remove();
};

for (let i = 0; i < initialCards.length; i++) {
  addCard(initialCards[i], removeCard);
}
