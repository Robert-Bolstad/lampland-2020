// Importing code
import { menu, clickBurger } from "./components/menu.js";
import errorMessage from "./components/errorMessage.js";
import { validateEmailAdress } from "./utils/emailValidator.js";
import { baseUrl } from "./settings/api.js";

// Calling my functions
menu();
clickBurger();

// Storing elements into constants
const form = document.querySelector(".registration-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const email = document.querySelector("#email");
const message = document.querySelector(".message-container");

// Adding event listener to form. On submit call the submitForm function.
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  message.innerHTML = "";

  // Adjusting values
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();
  const emailValue = email.value.trim();
  const validEmail = validateEmailAdress(emailValue);

  // adding validations to the input values
  if (
    usernameValue.length === 0 ||
    passwordValue.length === 0 ||
    confirmPasswordValue.length === 0 ||
    emailValue.length === 0
  ) {
    return errorMessage("warning", "Invalid values", ".message-container");
  }

  if (passwordValue !== confirmPasswordValue) {
    return errorMessage(
      "warning",
      "Passwords don't match",
      ".message-container"
    );
  }

  if (validEmail === false) {
    return errorMessage(
      "warning",
      "Please enter a valid E-mail address",
      ".message-container"
    );
  }

  if (passwordValue !== confirmPasswordValue) {
    return errorMessage(
      "warning",
      "Passwords don't match",
      ".message-container"
    );
  }
  if (usernameValue.length < 5) {
    return errorMessage(
      "warning",
      "Username needs to be at least 5 characters long",
      ".message-container"
    );
  }
  if (passwordValue.length < 8) {
    return errorMessage(
      "warning",
      "Password needs to be at least 8 characters long",
      ".message-container"
    );
  }

  doRegistration(usernameValue, passwordValue, emailValue);
}

async function doRegistration(username, password, email) {
  // Adding "auth/local/register" to my endpoint at baseUrl
  const url = baseUrl + "/auth/local/register";

  const data = JSON.stringify({
    username: username,
    email: email,
    password: password,
  });

  const options = {
    method: "POST",
    // Setting the property of the body to my data constant which stores my username, email and password in an object
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.statusCode === 400) {
      errorMessage(
        "error",
        json.message[0].messages[0].message,
        ".message-container"
      );
    }

    if (json.user.username === username) {
      location.href = "login.html";
    }
  } catch (error) {
    console.log(error);
  }
}
