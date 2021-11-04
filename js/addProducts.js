// Importing code
import { menu, clickBurger } from "./components/menu.js";
import { doLogout } from "./utils/logout.js";
import { imagePreview } from "./utils/imgUpload.js";
import { doCheckbox } from "./utils/checkbox.js";
import { userRole } from "./utils/checkUserType.js";
import { baseUrl } from "./settings/api.js";
import { retrieveFromStorage } from "./utils/localStorage.js";
import errorMessage from "./components/errorMessage.js";

// Checks and redirects non-admin users to the homepage
if (userRole() !== "authenticated") {
  location.href = "index.html";
}

// Calling my functions
menu();
clickBurger();
doLogout();
doCheckbox();
imagePreview();

// Storing elements into constants
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const form = document.querySelector(".form");
const imgUrlInput = document.querySelector(".form__img-url");
const checkbox = document.querySelector(".form__checkbox");
const img = document.querySelector(".form__img");
const message = document.querySelector(".message-container");
const categorySelect = document.querySelector(".form__select");

// Hiding The image Tag, im using this for image validation
img.hidden = true;

// Adding a submit event to my form
form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  // Getting value and index of selected category
  const categoryIndex = categorySelect.selectedIndex;
  const options = categorySelect.options;
  const category = options[categoryIndex].value;

  // Adjusting values
  message.innerHTML = "";
  const checkboxValue = checkbox.checked;
  const imgUrlValue = imgUrlInput.value.trim();
  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();

  // Adding validations to my submit event
  if (
    titleValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length < 10
  ) {
    return errorMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }
  if (img.src === "") {
    return errorMessage(
      "warning",
      "Please enter a valid img URL",
      ".message-container"
    );
  }

  // Calling the addNewProduct function and adding my values
  addNewProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imgUrlValue,
    checkboxValue,
    category,
    categoryIndex
  );
}

// This function adds a new product to Strapi
async function addNewProduct(
  title,
  price,
  description,
  imageurl,
  checkboxValue,
  category,
  categoryIndex
) {
  const url = baseUrl + "/products";

  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    image_url: imageurl,
    featured: checkboxValue,
    category: category,
    categoryindex: categoryIndex,
  });

  const key = retrieveFromStorage("token");

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);

    if (json.created_at) {
      errorMessage("success", "Product created", ".message-container");
    }

    if (json.error) {
      errorMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    errorMessage("error", error, ".message-container");
  }
}
