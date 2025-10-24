export function setButtonText(btn, isLoading, text) {
  isLoading ? (btn.textContent = `${text}ing...`) : (btn.textContent = text);
}
