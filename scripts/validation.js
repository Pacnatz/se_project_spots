// Declaring a configuration object that contains the
// necessary classes and selectors.
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
  errorSuffix: "-error",
};

const showInputError = (settings, formEl, inputEl, errorMessage) => {
  const errorElement = formEl.querySelector(
    `#${inputEl.id}${settings.errorSuffix}`
  );

  inputEl.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (settings, formEl, inputEl) => {
  const errorElement = formEl.querySelector(
    `#${inputEl.id}${settings.errorSuffix}`
  );

  inputEl.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (settings, formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(settings, formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(settings, formEl, inputEl);
  }
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((inputEl) => {
    hideInputError(settings, formEl, inputEl);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (settings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableButton(settings, buttonElement);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const disableButton = (settings, buttonElement) => {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

const setEventListeners = (settings, formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, inputList, buttonElement);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(settings, formEl, inputEl);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};

const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(settings, formEl);
  });
};

enableValidation(settings);
