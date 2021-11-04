import { userRole } from "../utils/checkUserType.js";

// This function creates the Navigation bar based on the user Type
export function menu() {
  const menu = document.querySelector(".nav");

  switch (userRole()) {
    case "guest":
      menu.innerHTML = `<div class="nav__top">
                                <button class="nav__button-mobile"><i class="nav__burger fas fa-bars fa-lg"></i></button>
                                <a class="nav__logo-icon"href="index.html"><img class="nav__logo-icon" src="./img/logo.svg" alt="logo"></a>
                                <a class="nav__logo"href="index.html">Lampland<span class="nav__logo--modify">.</sapn>com</a>
                                <a class="nav__cart nav__item--mobile" href="cart.html"><i class="nav__cart-icon fas fa-shopping-cart fa-lg"></i></a>
                            </div>
                            <ul class="nav__list">
                                    <li class="nav__item nav__item--mobile nav__item--x">
                                        <button class="nav__close-burger"><i class=" nav__x fas fa-times fa-lg"></i></button>
                                    </li>
                                    <li class="nav__item">
                                        <a class="nav__link" href="index.html">Home</a>
                                    </li>
                                    <li class="nav__item">
                                        <a class="nav__link" href="products.html">Products</a>
                                    </li>
                                    <li class="nav__item nav__cart nav__item--mobile">
                                        <a class="nav__link" href="cart.html">Cart</a>
                                    </li>
                                    <li class="nav__item nav__login">
                                        <a class="nav__link" href="login.html">Login</a> 
                                    </li>
                                </ul>
                                <div class="nav__veiw-cart">
                                    <a class="nav__cart--spacing" href="cart.html"><i class="nav__cart-icon fas fa-shopping-cart fa-lg"></i></a>
                                    <a class="nav__link" href="cart.html">Veiw Cart</a>
                                </div>`;
      break;

    case "public":
      menu.innerHTML = `<div class="nav__top">
                                <button class="nav__button-mobile"><i class="nav__burger fas fa-bars fa-lg"></i></button>
                                <a class="nav__logo-icon"href="index.html"><img class="nav__logo-icon" src="./img/logo.svg" alt="logo"></a>
                                <a class="nav__logo"href="index.html">Lampland<span class="nav__logo--modify">.</sapn>com</a>
                                <a class="nav__cart nav__item--mobile" href="cart.html"><i class="nav__cart-icon fas fa-shopping-cart fa-lg"></i></a>
                            </div>
                            <ul class="nav__list">
                                    <li class="nav__item nav__item--mobile nav__item--x">
                                        <button class="nav__close-burger"><i class=" nav__x fas fa-times fa-lg"></i></button>
                                    </li>
                                    <li class="nav__item">
                                        <a class="nav__link" href="index.html">Home</a>
                                    </li>
                                    <li class="nav__item">
                                        <a class="nav__link" href="products.html">Products</a>
                                    </li>
                                    <li class="nav__item nav__cart nav__item--mobile">
                                        <a class="nav__link" href="cart.html">Cart</a>
                                    </li>
                                    <li class="nav__item nav__favorites">
                                        <a class="nav__link" href="favorites.html">Favorites</a>
                                    </li>
                                    <li class="nav__item">
                                        <button class="nav__logout">Logout</button>
                                    </li>
                                </ul>
                                <div class="nav__veiw-cart">
                                    <a class="nav__cart--spacing" href="cart.html"><i class="nav__cart-icon fas fa-shopping-cart fa-lg"></i></a>
                                    <a class="nav__link" href="cart.html">Veiw Cart</a>
                                </div>`;
      break;

    case "authenticated":
      menu.innerHTML = `<div class="nav__top">
                            <button class="nav__button-mobile"><i class="nav__burger fas fa-bars fa-lg"></i></button>
                            <a class="nav__logo-icon"href="index.html"><img class="nav__logo-icon" src="./img/logo.svg" alt="logo"></a>
                            <a class="nav__logo"href="index.html">Lampland<span class="nav__logo--modify">.</sapn>com</a>
                            <a class="nav__cart nav__item--mobile" href="cart.html"><i class="nav__cart-icon fas fa-shopping-cart fa-lg"></i></a>
                        </div>
                        <ul class="nav__list">
                                <li class="nav__item nav__item--mobile nav__item--x">
                                    <button class="nav__close-burger"><i class=" nav__x fas fa-times fa-lg"></i></button>
                                </li>
                                <li class="nav__item">
                                    <a class="nav__link" href="index.html">Home</a>
                                </li>
                                <li class="nav__item">
                                    <a class="nav__link" href="products.html">Products</a>
                                </li>
                                <li class="nav__item">
                                    <a class="nav__link" href="addproducts.html">Add Products</a>
                                </li>
                                <li class="nav__item nav__cart nav__item--mobile">
                                    <a class="nav__link" href="cart.html">Cart</a>
                                </li>
                                <li class="nav__item nav__favorites">
                                    <a class="nav__link" href="favorites.html">Favorites</a>
                                </li>
                                <li class="nav__item">
                                    <button class="nav__logout">Logout</button>
                                </li>
                            </ul>
                            <div class="nav__veiw-cart">
                                <a class="nav__cart--spacing" href="cart.html"><i class="nav__cart-icon fas fa-shopping-cart fa-lg"></i></a>
                                <a class="nav__link" href="cart.html">Veiw Cart</a>
                            </div>`;
  }
}

// This function handles click events. It enables users to open and close the nav burger on smaller screens
export function clickBurger() {
  const burger = document.querySelector(".nav__button-mobile");
  const close = document.querySelector(".nav__close-burger");
  const list = document.querySelector(".nav__list");

  burger.addEventListener("click", () => {
    list.classList.toggle("burger-open");
    list.style.transition = "transform 0.5s ease-in";
  });
  close.addEventListener("click", () => {
    list.classList.toggle("burger-open");
  });
  // Removing the class of (burger-open) on screens larger than 768px. If this is not removed and the class is active, it will mess up the styling on larger screens.
  addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      list.classList.remove("burger-open");
      list.style.transition = "none";
    }
  });
}
