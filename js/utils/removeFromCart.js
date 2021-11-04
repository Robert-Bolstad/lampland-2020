import { saveToStorage } from "./localStorage.js";

// This function removes the clicked item from the cart
export function removeFromCart(removeBtn, products) {

    removeBtn.forEach((button) => {
        button.addEventListener("click", handleClick);
    });

    function handleClick() {
        const id = this.dataset.id;

        const filtered = products.filter(function (product) {
            if (product.productId != id) {
                return true;
            }
        });
        saveToStorage("products", filtered);
        location.reload();
    }
}
