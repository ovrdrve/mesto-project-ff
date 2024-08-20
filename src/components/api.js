import { checkResponse } from "../utils/checkResponse";

const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "81858c81-3db1-41c3-b971-7e36b07ca817",
    "Content-Type": "application/json",
  },
};

const getUserData = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const getInitialCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const updateUserData = (name, about) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
};

const postNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
};

const deleteCard = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const addLike = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const removeLike = (id) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(checkResponse);
};

const updateUserAvatar = (avatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkResponse);
};

const getUrlContentType = (url) => {
  return fetch(`${url}`, {
    method: "HEAD",
  }).then(checkResponse);
};

export {
  getUserData,
  getInitialCards,
  updateUserData,
  postNewCard,
  deleteCard,
  addLike,
  removeLike,
  updateUserAvatar,
  getUrlContentType,
};
