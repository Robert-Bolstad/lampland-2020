// Importing code
import { menu, clickBurger } from "./components/menu.js";
import { openFilter } from "./components/filter.js";
import { baseUrl } from "./settings/api.js";
import { doDelete } from "./utils/delete.js";
import { userRole } from "./utils/checkUserType.js";
import { doLogout } from "./utils/logout.js";
import { doFilterCheckbox } from "./utils/checkbox.js";

// Calling my functions
menu();
clickBurger();
openFilter();
loadProducts();
doLogout();
doFilterCheckbox();

// Storing elements into constants
const container = document.querySelector(".container");
const search = document.querySelector(".filter__input");
const checkboxBtns = document.querySelectorAll(".filter-checkbox-btn");
const price = document.querySelectorAll(".price-filter__input");

// This function gets all the products from the API
async function loadProducts() {
  const products = baseUrl + "/products";

  try {
    const response = await fetch(products);
    const json = await response.json();

    // Checks if the result is filtered
    filterResultes(json);
  } catch (error) {
    console.log(error);
  }
}

// This function will filter the results.
function filterResultes(json) {
  const checkboxs = document.querySelectorAll(".checkbox-filter");

  let activeCategories = [];

  checkboxs.forEach((checkbox) => {
    if (checkbox.checked) {
      activeCategories.push(checkbox.name);
    }
  });

  console.log(activeCategories);

  const searchValue = search.value.trim().toLowerCase();

  const SearchFilter = json.filter(function (card) {
    if (
      card.title.toLowerCase().includes(searchValue) ||
      card.description.toLowerCase().includes(searchValue)
    ) {
      return true;
    }
  });

  let priceValue = price[0].value;

  if (priceValue.length === 0) {
    priceValue = 99999999999;
  }

  if (activeCategories.length !== 0) {
    const filter = SearchFilter.filter(function (card) {
      if (
        activeCategories.includes(card.category) &&
        card.price <= parseFloat(priceValue)
      ) {
        return true;
      }
    });

    filteredResultes(filter);
  }

  if (activeCategories.length === 0) {
    const filter = SearchFilter.filter(function (card) {
      if (card.price <= parseFloat(priceValue)) {
        return true;
      }
    });

    filteredResultes(filter);
  }
}

// This function takes the filtered results and creates Html for the homepage
function filteredResultes(cards) {
  container.innerHTML = "";

  cards.forEach((product) => {
    // This is the HTML created for non-admin users
    if (userRole() !== "authenticated") {
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
    } else {
      // This is the HTML created for admin users
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
                                            <div class="card__admin-section">
                                                <a class="card__edit" href="editproducts.html?id=${
                                                  product.id
                                                }">Edit</a>
                                                <button class="card__delete" data-name="${
                                                  product.title
                                                }" data-id="${
        product.id
      }">Delete</button>
                                            </div>
                                        </div>
                                    </div>`;
    }
  });

  // This event enables admins to delete a product
  const deleteBtn = document.querySelectorAll(".card__delete");
  deleteBtn.forEach((button) => {
    button.addEventListener("click", doDelete);
  });
}

// This event enables users to filter the products
search.onkeyup = function () {
  loadProducts();
};

checkboxBtns.forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    loadProducts();
  });
});

price[0].onkeyup = function () {
  loadProducts();
};

price[0].onclick = function () {
  loadProducts();
};
