// This function calculates the subtotal price on the cart page
export function calculateSubtotal(prices, subtotal) {

    let sum = 0;

    prices.forEach(price => {
       const number = parseInt(price.innerHTML);
       
       sum += number;

       subtotal.innerHTML = sum + ",- NOK";

    });
}