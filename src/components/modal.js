const openPopup = (popupType) => {
  popupType.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupByEsc);
  popupType.addEventListener("mousedown", closePopupByClick);
};

const closePopup = (popupType) => {
  popupType.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupByEsc);
  popupType.removeEventListener("mousedown", closePopupByClick);
};

const closePopupByEsc = (e) => {
  if (e.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closePopup(currentPopup);
  }
};

const closePopupByClick = (e) => {
  if (e.target.classList.contains("popup") || e.target.classList.contains("popup__close")) {
    closePopup(e.currentTarget);
  }
};

export { openPopup, closePopup };
