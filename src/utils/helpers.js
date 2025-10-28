export function setButtonText(
  btn,
  isLoading,
  clickedText = "Saving...",
  originalText = "Save"
) {
  isLoading
    ? (btn.textContent = clickedText)
    : (btn.textContent = originalText);
}
