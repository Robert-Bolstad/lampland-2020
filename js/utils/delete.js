import { baseUrl } from "../settings/api.js";
import { retrieveFromStorage } from "./localStorage.js";

// This function enables the user to delete a product
export function doDelete() {
    const id = this.dataset.id;
    const name = this.dataset.name;

    // Creating a confirm message
    const confirmDelete = confirm("Are you sure you want to delete " + name + " from your list?");

    // If the user confirms delete, then the following function will delete the product from Strapi.
    if (confirmDelete) {
        (async function deleteProduct(id) {
            const url = baseUrl + "/products/" + id;
      
            const key = retrieveFromStorage("token");
        
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${key}`,
                },
            };
        
            try {
                await fetch(url, options);
                await response.json();
        
            } catch (error) {
                console.log(error);
            }
        })(id);

        location.reload();
    }
    
}