// Importing code
import { menu, clickBurger } from "./components/menu.js";
import { doLogout } from "./utils/logout.js";
import { userRole } from "./utils/checkUserType.js";
import { retrieveFromStorage } from "./utils/localStorage.js";

// Calling my functions
menu();
clickBurger();
doLogout();

// Checks and redirects non-logged in users to the homepage
if (userRole() === "guest") {
  location.href = "index.html";
}

// Storing elements into constants
const favContainer = document.querySelector(".fav-container");
const favorites = retrieveFromStorage("favorites");

if (favorites.length === 0) {
  favContainer.innerHTML += `<div class="favorites__empty">
                                    <p class="favorites__message">Your favorites list is empty. Click on the heart icon on product pages to add to favorites.</p>
                                    <a class="favorites__link-btn" href="products.html">Back to Products</a>
                                </div>`;
} else {
  favorites.forEach(function (fav) {
    favContainer.innerHTML += `<div class="card">
                                    <div class="card__info">
                                        <a href="productdetails.html?id=${
                                          fav.id
                                        }"><div class="card__img" style="background-image: url('${
      fav.img
    }');"></div></a>
                                        <div class="card__info-top">
                                            <a class="card__link"href="productdetails.html?id=${
                                              fav.id
                                            }"><h3>${fav.title}</h3></a>
                                            <h3 class="card__price">${
                                              fav.price + ",-"
                                            }</h3>    
                                        </div>
                                        <p class="card__description">${fav.description.substring(
                                          0,
                                          100
                                        )}</p>
                                    </div>
                                </div>`;
  });
}
