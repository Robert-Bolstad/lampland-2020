import { calculateSubtotal } from "../utils/calculateSubtotal.js";
import { saveToStorage } from "../utils/localStorage.js";

// This function calculates and displays the quantity of the product, by clicking on the minus of plus button 
export function IncrementAndDecrement(plusBtn, minusBtn, quantity, quantityDisplay) {

    quantityDisplay.innerHTML = quantity.value;

    plusBtn.addEventListener("click", function () {

        const newValue = (quantity.value = parseInt(quantity.value) + 1)
        quantityDisplay.innerHTML = newValue;
    
    })
    
    minusBtn.addEventListener("click", function () {
    
        const newValue = (quantity.value = parseInt(quantity.value) - 1);
    
        if (newValue < 1) {
    
            quantityDisplay.innerHTML = 1;
            quantity.value = 1;
    
        }else{
            quantityDisplay.innerHTML = newValue;
        }
    
    })
}

// This function calculates and displays the quantity of each product. It will also calculates each products price and the subtotal price. The function will also save the new property value of each product to local storage.

export function cartSubtractAndAbstract(allMinusBtns, allPlusBtns, prices, subtotal, products) {
    allMinusBtns.forEach(minusBtn => {
        minusBtn.addEventListener("click", function () {
        
            // Using this to get the sum price of the product later
            const price = minusBtn.parentElement.parentElement.querySelector(".cart__price");
            
            // This contains the price of 1 item, not sum of the product
            const priceEach = minusBtn.parentElement.parentElement.querySelector(".cart__sum").dataset.name;
    
            // This has the quantity value of the product
            const currentValue = minusBtn.parentElement.querySelector(".cart__input");
            
            const displayQuantity = minusBtn.parentElement.querySelector(".cart__input-display");
    
            // stops the value of going under 1
            function checkValue() {
                if (parseInt(currentValue.value) == 1) {
                    return parseInt(currentValue.value);
                }else{
                    // Calculating the new quantity value
                    return parseInt(currentValue.value) - 1;
                }
            }
    
            const newValue = checkValue()

            // Calculating new price
            const newPrice = parseInt(priceEach) * newValue;
    
            // Displaying the new quantity value
            displayQuantity.innerHTML = newValue;

            currentValue.value = newValue;

            // Displaying the new price
            price.innerHTML = newPrice + ",-";
    
            // Calculating the new subtotal price from all products
            calculateSubtotal(prices, subtotal); 
    
            // Saving the new values of the product to local storage
            products.forEach(product => {
    
                const objectId = minusBtn.parentElement.parentElement.querySelector(".cart__quantity").dataset.id;
                if (product.objectId == objectId) {
                    product.price = newPrice;
                    product.quantity = newValue;
                       
                }
                saveToStorage("products", products);
            });     
        })
    });
    
    allPlusBtns.forEach(plusBtn => {
        plusBtn.addEventListener("click", function () {
            
            // Using this to get the sum price of the product later
            const price = plusBtn.parentElement.parentElement.querySelector(".cart__price");

            // This contains the price of 1 item, not sum of the product
            const priceEach = plusBtn.parentElement.parentElement.querySelector(".cart__sum").dataset.name;
            
            // This has the quantity value of the product
            const currentValue = plusBtn.parentElement.querySelector(".cart__input");

            const displayQuantity = plusBtn.parentElement.querySelector(".cart__input-display");
    
            // Calculating the new quantity value
            const newValue = parseInt(currentValue.value) + 1;
    
            displayQuantity.innerHTML = newValue;
            currentValue.value = newValue;
        
            // Calculating new price
            const newPrice = parseInt(priceEach) * newValue;

            // Displaying the new price
            price.innerHTML = newPrice + ",-";
    
            // Calculating the new subtotal price from all products
            calculateSubtotal(prices, subtotal);
    
            // Saving the new values of the product to local storage
            products.forEach(product => {
    
                const objectId = plusBtn.parentElement.parentElement.querySelector(".cart__quantity").dataset.id;
                if (product.objectId == objectId) {
                    product.price = newPrice;
                    product.quantity = newValue;
                       
                }
                saveToStorage("products", products);
            });     
        })
    });
}
