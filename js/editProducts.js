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

// Getting the querystring
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// Checking if query-string or id exists in the URL
if (!queryString || !id) {
  document.location.href = "/";
}

// Storing the product URL into a constant
const productUrl = baseUrl + "/products/" + id;

// Storing elements into constants
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const form = document.querySelector(".form");
const img = document.querySelector(".form__img");
const checkbox = document.querySelector(".form__checkbox");
const checkboxBtn = document.querySelector(".form__checkbox-btn");
const imgUrlInput = document.querySelector(".form__img-url");
const imgPreviewBox = document.querySelector(".form__img-display");
const message = document.querySelector(".message-container");
const categorySelect = document.querySelector(".form__select");

// Hiding The image Tag, im using this for image validation
img.hidden = true;

// This function retrieves information of the API and assigns the values to my editproduct page
(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    // Assigning values to the elements
    categorySelect.value = details.category;
    title.value = details.title;
    description.value = details.description;
    price.value = details.price;
    img.src = details.image_url;
    imgUrlInput.value = details.image_url;
    form.dataset.id = details.id;
    imgPreviewBox.style.backgroundImage = `url('${details.image_url}')`;
    imgPreviewBox.style.backgroundSize = "contain";
    // Checks if the product is featured or not
    if (details.featured === true) {
      checkboxBtn.click();
    }
  } catch (error) {
    errorMessage("error", error, ".message-container");
  }
})();

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
  const id = form.dataset.id;

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

  // Calling the updateProduct function and adding my values
  updateProduct(
    titleValue,
    priceValue,
    descriptionValue,
    imgUrlValue,
    checkboxValue,
    id,
    category,
    categoryIndex
  );
}

// This function updates the product values to Strapi
async function updateProduct(
  title,
  price,
  description,
  imageurl,
  checkboxValue,
  id,
  category,
  categoryIndex
) {
  const url = baseUrl + "/products/" + id;

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
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      errorMessage("success", "Product Updated", ".message-container");
    }

    if (json.error) {
      errorMessage("error", json.message, ".message-container");
    }
  } catch (error) {
    errorMessage("error", error, ".message-container");
  }
}
