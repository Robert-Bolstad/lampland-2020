// This function creates a popup when the user adds an item to cart
export function createModal(img, name, price) {
  const modal = document.querySelector(".modal-wrapper");
  const overlay = document.querySelector(".overlay");

  overlay.style.display = "block";

  modal.innerHTML = `<div class="modal" id="modal">
                            <button class="modal__close"><i class=" fas fa-times fa-lg"></i></button>
                            <div class="modal__wrapper">
                                <img class="modal__img" src="${img}" alt="product">
                                <p class="modal__name">${name}</p>
                                <div class="modal__price">Total price: ${
                                  price + ",-"
                                }</div>
                            </div>
                            <div class="modal__btn-wrapper">
                                <a href="products.html" class="modal__return-btn">Continue shopping</a>
                                <a href="cart.html" class="modal__cart-btn">Go to cart</a>
                            </div>
                        </div>`;

  const escape = document.querySelector(".modal__close");

  escape.addEventListener("click", function () {
    overlay.style.display = "none";
    modal.innerHTML = "";
  });
}
