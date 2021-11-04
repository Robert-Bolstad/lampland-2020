// Importing code
import { hero } from "./components/hero.js";
import { menu, clickBurger } from "./components/menu.js";
import { doLogout } from "./utils/logout.js";
import { baseUrl } from "./settings/api.js";

// Calling my functions
menu();
clickBurger();
doLogout();
hero();
loadProducts();

// Storing the container element into a constant
const container = document.querySelector(".container");

// This function gets all the products from the API
async function loadProducts() {
  const products = baseUrl + "/products";

  try {
    const response = await fetch(products);
    const json = await response.json();

    // Calling my filterResults() function and passing in the result from the API
    filterResultes(json);
  } catch (error) {
    console.log(error);
  }
}

// This function filters the results from loadProducts() and returns all the featured products
function filterResultes(json) {
  const filtered = json.filter(function (card) {
    if (card.featured) {
      return true;
    }
  });

  // Calling my filteredResults() function and passing in the result from the filterResults()
  filteredResultes(filtered);
}

// This function takes the filtered results and creates Html for the homepage
function filteredResultes(cards) {
  cards.forEach((product) => {
    container.innerHTML += `<div class="card">
                                    <div class="card__info">
                                        <a href="productdetails.html?id=${
                                          product.id
                                        }"><div class="card__img" style="background-image: url('${
      product.image_url
    }');"></div></a>
                                        <div class="card__info-top">
                                            <a class="card__link"href="productdetails.html?id=${
                                              product.id
                                            }"><h3>${product.title}</h3></a>
                                            <h3 class="card__price">${
                                              product.price + ",-"
                                            }</h3>    
                                        </div>
                                        <p class="card__description">${product.description.substring(
                                          0,
                                          100
                                        )}</p>
                                    </div>
                                </div>`;
  });
}
