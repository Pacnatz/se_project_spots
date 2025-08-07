const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileFormElement = editProfileModal.querySelector(".modal__form");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostCardInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#card-caption-input");
const newPostFormElement = newPostModal.querySelector(".modal__form");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
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
  editProfileModal.classList.remove("modal_is-opened");
}

// Create the form submission handler.
function handleAddCardSubmit(evt) {
  // Prevent default browser behavior.
  evt.preventDefault();
  // Log both input values to the console.
  console.log(newPostCardInput.value);
  console.log(newPostCaptionInput.value);
  // Close the modal.
  newPostModal.classList.remove("modal_is-opened");
}
