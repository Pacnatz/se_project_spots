import "./index.css";
import {
  settings as validationSettings,
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileFormElement = document.forms["profile-form"];
const editProfileSubmitBtn =
  editProfileFormElement.querySelector(".modal__submit-btn");

const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarInput = editAvatarModal.querySelector("#edit-avatar-input");
const editAvatarFormElement = document.forms["edit-avatar-form"];
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCardInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const newPostFormElement = document.forms["new-post-form"];
const newPostSubmitBtn = newPostFormElement.querySelector(".modal__submit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__picture");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const deleteModal = document.querySelector("#delete-post-modal");
const deleteCardFormElement = document.forms["delete-card-form"];
const deleteModalSubmitBtn = deleteCardFormElement.querySelector(
  ".modal__submit-btn_type_delete"
);
const deleteModalCancelBtn = deleteCardFormElement.querySelector(
  ".modal__submit-btn_type_cancel"
);

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

let selectedCard;
let selectedCardId;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6623a1af-e171-4d8d-8717-ab953b9a2a00",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    cards.forEach(function (card) {
      renderCard(card, "append");
      // Handle user info
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.src = userData.avatar;
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Find all overlays
const overlays = document.querySelectorAll(".modal");
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.target === overlay) {
      closeModal(overlay);
    }
  });
});

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

function handleEscapeKey(evt) {
  // Close all overlays
  if (evt.key === "Escape") {
    overlays.forEach((overlay) => {
      closeModal(overlay);
    });
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

editProfileBtn.addEventListener("click", function () {
  resetValidation(editProfileFormElement, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  openModal(editProfileModal);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

editAvatarBtn.addEventListener("click", function () {
  openModal(editAvatarModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// Set the submit listener.
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);
// Handle avatar submit listener.
editAvatarFormElement.addEventListener("submit", handleEditAvatarSubmit);
// Handle the new post form submit listener.
newPostFormElement.addEventListener("submit", handleAddCardSubmit);
// Handle the delete form submit listner
deleteCardFormElement.addEventListener("submit", handleDeleteSubmit);

function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  setButtonText(editProfileSubmitBtn, true);
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      // Close the modal.
      closeModal(editProfileModal);
      disableButton(validationSettings, editProfileSubmitBtn);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(editProfileSubmitBtn, false);
    });
}

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  // Change text to "Saving..."
  setButtonText(editAvatarSubmitBtn, true);
  api
    .editAvatarInfo({ avatar: editAvatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(editAvatarModal);
    })
    .catch(console.error)
    .finally(() => {
      // Change text back
      setButtonText(editAvatarSubmitBtn, false);
    });
}

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  setButtonText(newPostSubmitBtn, true);
  evt.preventDefault();
  api
    .addCard({
      name: newPostCaptionInput.value,
      link: newPostCardInput.value,
    })
    .then((data) => {
      const inputValues = { name: data.name, link: data.link, _id: data._id };
      renderCard(inputValues);
      // Close the modal.
      closeModal(newPostModal);
      disableButton(validationSettings, newPostSubmitBtn);
      evt.target.reset();
    })
    .catch(console.error)
    .then(() => {
      setButtonText(newPostSubmitBtn, false);
    });
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  setButtonText(deleteModalSubmitBtn, true, "Deleting...", "Delete");
  api
    .deleteCard(selectedCardId) // pass the ID the the api function
    .then(() => {
      // remove the card from the DOM
      selectedCard.remove();
      // close the modal
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteModalSubmitBtn, false, "Deleting...", "Delete");
    });
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  cardTitle.textContent = data.name;
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  cardImage.addEventListener("click", () => {
    previewModalCaption.textContent = data.name;
    previewModalImage.setAttribute("src", data.link);
    previewModalImage.setAttribute("alt", data.name);

    openModal(previewModal);
  });

  cardLikeBtnEl.addEventListener("click", (evt) =>
    handleLikeStatus(evt, cardLikeBtnEl, data._id)
  );

  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data._id);
  });

  return cardElement;
}

function handleLikeStatus(evt, cardLikeBtnEl, cardId) {
  if (evt.target.classList.contains("card__like-btn_active")) {
    api
      .changeLikeStatus(cardId, true)
      .then((data) => {
        cardLikeBtnEl.classList.toggle("card__like-btn_active");
      })
      .catch(console.error);
  } else {
    api
      .changeLikeStatus(cardId, false)
      .then((data) => {
        cardLikeBtnEl.classList.toggle("card__like-btn_active");
      })
      .catch(console.error);
  }
}

function handleDeleteCard(cardElement, cardId) {
  openModal(deleteModal);
  selectedCard = cardElement;
  selectedCardId = cardId;
}

// Handle delete form close button
deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

// The function accepts a card object and a method of adding to the section
// The method is initially `prepend`, but you can pass `append`
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardsList[method](cardElement);
}

enableValidation(validationSettings);
