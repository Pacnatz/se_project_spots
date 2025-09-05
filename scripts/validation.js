const showInputError = (formEl, inputEl, errorMessage) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);

  inputEl.classList.add("modal__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__error_active");
};

const hideInputError = (formEl, inputEl) => {
  const errorElement = formEl.querySelector(`#${inputEl.id}-error`);

  inputEl.classList.remove("modal__input_type_error");
  errorElement.classList.remove("modal__error_active");
  errorElement.textContent = "";
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    buttonElement.classList.remove("modal__submit-btn_inactive");
    buttonElement.removeAttribute("disabled");
  }
};

const disableButton = (buttonElement) => {
  buttonElement.classList.add("modal__submit-btn_inactive");
  buttonElement.setAttribute("disabled", true);
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__submit-btn");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
