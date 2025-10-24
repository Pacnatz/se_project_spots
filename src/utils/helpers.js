export function setButtonText(btn, isLoading, text = "Save") {
  isLoading ? (btn.textContent = `${text}ing...`) : (btn.textContent = text);
}
