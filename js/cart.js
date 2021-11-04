// Importing code
import { menu, clickBurger } from "./components/menu.js";
import { doLogout } from "./utils/logout.js";
import { retrieveFromStorage } from "./utils/localStorage.js";
import { removeFromCart } from "./utils/removeFromCart.js";
import { calculateSubtotal } from "./utils/calculateSubtotal.js";
import { cartSubtractAndAbstract } from "./utils/quantity.js";

// Calling my functions
menu();
clickBurger();
doLogout();

// Storing elements into constants
const products = retrieveFromStorage("products");
const container = document.querySelector(".cart_container");
const subtotalContainer = document.querySelector(".cart__bottom");

// Checks if the cart is empty
if (products.length === 0) {
  // Create HTML for empty cart
  container.innerHTML += `<div class="cart__empty">
                                <p class="cart__message">Your shopping cart is empty. Keep shopping and find the products you are looking for.</p>
                                <a class="cart__link-btn" href="products.html">Back to Products</a>
                            </div>`;
} else {
  // Create HTML for Cart
  subtotalContainer.innerHTML = `<div class="cart__subtotal">
                                        <h3 class="cart__subtotal-heading">Subtotal</h3>
                                        <p class="cart__subtotal-price"></p>
                                    </div>
                                    <div class="cart__checkout-wrap">
                                        <button class="cart__checkout button">Checkout</button>
                                    </div>`;

  products.forEach((product) => {
    // Create HTML each product
    container.innerHTML += `<div class="cart__item-wrap">
                                    <div class="cart__item">
                                    <div class="cart__img" style="background-image: url('${product.img}');">
                                    </div>
                                    <a href="productdetails.html?id=${product.id}"><h3 class="cart__title">${product.title}</h3></a>
                                    <p class="cart__sum" data-name="${product.priceEach}">Sum: <span class="cart__price">${product.price},-</span></p>
                                    <div class="cart__quantity" data-id="${product.objectId}">
                                        <button class="cart__quantity-btn-minus">-</button>
                                        <div>
                                            <input class="cart__input" value="${product.quantity}" type="number" hidden>
                                            <div class="cart__input-display"></div>
                                        </div>
                                        <button class="cart__quantity-btn-pluss">+</button>
                                    </div>
                                </div>
                                <button class="cart__remove" data-id="${product.productId}">Remove</button>
                                </div>`;
  });
}

// Storing elements into constants
const allMinusBtns = document.querySelectorAll(".cart__quantity-btn-minus");
const allPlusBtns = document.querySelectorAll(".cart__quantity-btn-pluss");
const quantityDisplay = document.querySelectorAll(".cart__input-display");

// Displaying the quantity for each product
quantityDisplay.forEach((quantityDisplay) => {
  const displayValue =
    quantityDisplay.parentElement.querySelector(".cart__input").value;
  quantityDisplay.innerHTML = displayValue;
});

// Storing elements into constants and calculating the subtotal price
const prices = document.querySelectorAll(".cart__price");
const subtotal = document.querySelector(".cart__subtotal-price");
calculateSubtotal(prices, subtotal);

// This function calculates and displays the quantity of each product. It will also calculate each product price and the subtotal price. The function will also save the new property value of each product to local storage.
cartSubtractAndAbstract(allMinusBtns, allPlusBtns, prices, subtotal, products);

const removeBtn = document.querySelectorAll(".cart__remove");
// This function removes the clicked item from the cart
removeFromCart(removeBtn, products);
