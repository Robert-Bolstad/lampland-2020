// This function creates a message
export default function errorMessage(messageType, message, targetElement) {
  const element = document.querySelector(targetElement);
  element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}
