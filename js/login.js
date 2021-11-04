// Importing code
import { menu, clickBurger } from "./components/menu.js";
import { saveToStorage, retrieveFromStorage } from "./utils/localStorage.js";
import errorMessage from "./components/errorMessage.js";
import { baseUrl } from "./settings/api.js";

// If  the user is already logged in, redirect to homepage
const isLoggedIn = retrieveFromStorage("user").confirmed;
if (isLoggedIn) {
  location.href = "index.html";
}

// Calling my functions
menu();
clickBurger();

// Storing elements into constants
const form = document.querySelector(".login-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

// Adding event listener to form. On submit call the submitForm function.
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  message.innerHTML = "";

  // Adjusting values
  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  // Checking if username or password has any inputted values
  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return errorMessage("warning", "Invalid values", ".message-container");
  }

  if (passwordValue.length < 8) {
    return errorMessage("warning", "Invalid password", ".message-container");
  }

  // Calling the function doLogin() and passing in the values of usernameValue and passwordValue
  doLogin(usernameValue, passwordValue);
}

async function doLogin(username, password) {
  // Adding "auth/local" to my endpoint at baseUrl
  const url = baseUrl + "/auth/local";

  const favoritesUrl = baseUrl + "/favorites";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    // Setting the property of the body to my data constant which stores my username and password in an object
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // Fetching the API URL and passing in options as a second argument to the fetch request
    const response = await fetch(url, options);
    const json = await response.json();

    const favResponse = await fetch(favoritesUrl);
    const favorites = await favResponse.json();

    // If the user information is correct, it will execute the following code

    if (json.user) {
      const userName = json.user.username;

      const findFav = favorites.filter(function (favs) {
        if (favs.userName === userName) {
          return true;
        }
      });

      if (findFav.length === 0) {
        console.log("empty");
      } else {
        const myFavorites = findFav[0].favorites;
        saveToStorage("favorites", myFavorites);
      }

      saveToStorage("user", json.user);
      saveToStorage("token", json.jwt);

      location.href = "index.html";
    }
    // If the user information is incorrect, it will execute the following code
    if (!json.user) {
      const jsonError = json.message[0].messages[0].message;

      errorMessage("warning", jsonError, ".message-container");
    }
  } catch (error) {
    errorMessage("error", error, ".message-container");
  }
}
