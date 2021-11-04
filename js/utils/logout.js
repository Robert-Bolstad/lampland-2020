import { removeItem, retrieveFromStorage } from "./localStorage.js";
import { baseUrl } from "../settings/api.js";

 // This function removes the user and the authorization token from local storage and saves favourites from local storage to Strapi.

export function doLogout() {

    const loggedIn = retrieveFromStorage("user").confirmed;

    if (loggedIn) {
        const logout = document.querySelector(".nav__logout");

        logout.addEventListener("click", () => {
            
            const userName = retrieveFromStorage("user").username;
            const favorites = retrieveFromStorage("favorites");
            
            saveFavorites(userName, favorites);
            
        });
    }
};

// this function saves favourites from local storage to strapi.

async function saveFavorites(userName, favorites) {

    let url = baseUrl + "/favorites";

    const data = JSON.stringify({userName: userName, favorites: favorites});

    const key = retrieveFromStorage("token");

    const put = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
        },
    };

    const post = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
        },
    };

    try {

        const response = await fetch(url);
        const json = await response.json();

        const hasFav = json.filter(function (favs) {
            if (favs.userName === userName) {
                return true;
            }
        })

        if (hasFav.length === 0) {

            await fetch(url, post);

        }else{

            const id = hasFav[0].id;
            url = url + `/${id}`
            await fetch(url, put);
        }

        removeItem("user");
        removeItem("token");
        removeItem("favorites");
        location.href = "index.html";


    } catch (error) {
        console.log(error);
    }
}