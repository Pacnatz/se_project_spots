const initialCards = [
  {
    name: "Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest...",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileFormElement = document.forms["profile-form"];
const editProfileSubmitBtn =
  editProfileFormElement.querySelector(".modal__submit-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostCardInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const newPostFormElement = document.forms["new-post-form"];
const newPostSubmitBtn = newPostFormElement.querySelector(".modal__submit-btn");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewModalImage = previewModal.querySelector(".modal__picture");
const previewModalCaption = previewModal.querySelector(".modal__caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Find all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
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

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// Set the submit listener.
editProfileFormElement.addEventListener("submit", handleProfileFormSubmit);

// Create the submit listener.
newPostFormElement.addEventListener("submit", handleAddCardSubmit);

function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();
  // Get the values of each form field from the value
  // property of the corresponding input element.
  // Insert these new values into the textContent
  // property of the corresponding profile elements.
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  // Close the modal.
  closeModal(editProfileModal);
  disableButton(editProfileSubmitBtn);
}

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();

  const inputValues = {
    name: newPostCaptionInput.value,
    link: newPostCardInput.value,
  };

  renderCard(inputValues);
  // Close the modal.
  closeModal(newPostModal);

  console.log("work");
  disableButton(newPostSubmitBtn);
  evt.target.reset();
}

initialCards.forEach(function (card) {
  renderCard(card, "append");
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");

  cardTitle.textContent = data.name;
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);

  cardImage.addEventListener("click", () => {
    previewModalCaption.textContent = data.name;
    previewModalImage.setAttribute("src", data.link);
    previewModalImage.setAttribute("alt", data.name);

    openModal(previewModal);
  });

  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// The function accepts a card object and a method of adding to the section
// The method is initially `prepend`, but you can pass `append`
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardsList[method](cardElement);
}
