// Importing code
import { menu, clickBurger } from "./components/menu.js";
import { createModal } from "./components/modal.js";
import { doLogout } from "./utils/logout.js";
import { baseUrl } from "./settings/api.js";
import { saveToStorage, retrieveFromStorage } from "./utils/localStorage.js";
import { IncrementAndDecrement } from "./utils/quantity.js";
import { userRole } from "./utils/checkUserType.js";

// Calling my functions
menu();
clickBurger();
doLogout();

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
const img = document.querySelector(".details-page__img");
const title = document.querySelector(".details-page__title");
const description = document.querySelector(".details-page__description");
const price = document.querySelector(".details-page__price");
const minusBtn = document.querySelector(".details-page__quantity-btn-minus");
const plusBtn = document.querySelector(".details-page__quantity-btn-pluss");
const quantity = document.querySelector(".details-page__input");
const quantityDisplay = document.querySelector(".details-page__input-display");
const favElement = document.querySelector(".details-page__fav");

// Hiding the fav icon if the user is not logged in
if (userRole() === "guest") {
  favElement.style.display = "none";
}

// This function calculates and displays the quantity of the product, by clicking on the minus of plus button
IncrementAndDecrement(plusBtn, minusBtn, quantity, quantityDisplay);

// This function retrieves information of the API and assigns the values to my productDetails page
(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();

    // Assigning values to the elements
    document.title = details.title;
    title.innerHTML = details.title;
    description.innerHTML = details.description;
    price.innerHTML = details.price + ",-";
    img.style.backgroundImage = `url('${details.image_url}')`;
    img.style.backgroundSize = "contain";
    const addToCart = document.querySelector(".details-page__cart-btn");

    // This event adds the product to local storage
    addToCart.addEventListener("click", function () {
      // Assigning new values
      const title = details.title;
      const image = details.image_url;
      const products = retrieveFromStorage("products");
      const objectId = Math.random();
      const id = details.id;
      const productId = Math.random();
      const newPrice = parseInt(price.innerHTML) * quantity.value;

      const newProduct = {
        id: id,
        objectId: objectId,
        productId: productId,
        img: image,
        title: title,
        priceEach: details.price,
        price: newPrice,
        quantity: quantity.value,
      };

      products.push(newProduct);

      saveToStorage("products", products);

      // This function creates a popup when the user adds an item to cart
      createModal(image, title, newPrice);
    });

    // These next lines add and removes favorites from local storage

    const id = details.id;

    const favorites = retrieveFromStorage("favorites");

    const existsingFavs = favorites.find(function (fav) {
      return fav.id === id;
    });

    if (existsingFavs !== undefined) {
      favElement.classList.toggle("fav-active");
      favElement.classList.toggle("fa");
    }

    favElement.addEventListener("click", function () {
      this.classList.toggle("fav-active");
      this.classList.toggle("fa");

      const currentFavs = retrieveFromStorage("favorites");

      const productExists = currentFavs.find(function (fav) {
        return fav.id === id;
      });

      if (productExists === undefined) {
        const product = {
          id: details.id,
          img: details.image_url,
          price: details.price,
          title: details.title,
          description: details.description,
        };

        currentFavs.push(product);
        saveToStorage("favorites", currentFavs);
      } else {
        const newFavs = currentFavs.filter((fav) => fav.id !== id);
        saveToStorage("favorites", newFavs);
      }
    });
  } catch (error) {
    document.location.href = "/";
  }
})();
