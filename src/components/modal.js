const handleOpenPopup = (popupType) => {
  popupType.classList.add("popup_is-opened");

  document.addEventListener("mousedown", handleClosePopup);
  document.addEventListener("keydown", handleClosePopup);
};

const handleClosePopup = (e) => {
  const currentPopup = document.querySelector(".popup_is-opened");
  const currentPopupContent = currentPopup.querySelector(".popup__content");
  const popupCloseButton = currentPopup.querySelector(".popup__close");

  const closePopup = () => {
    currentPopup.classList.remove("popup_is-opened");

    document.removeEventListener("mousedown", handleClosePopup);
    document.removeEventListener("keydown", handleClosePopup);
  };

  if (e.target === popupCloseButton) closePopup();
  if (!e.composedPath().includes(currentPopupContent) && e.type === "mousedown") closePopup();
  if (e.key === "Escape") closePopup();
  if (e.type === "submit") closePopup();
};

export { handleOpenPopup, handleClosePopup };
