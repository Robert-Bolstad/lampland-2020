import { retrieveFromStorage } from "./localStorage.js";

// This function checks the role type of the user. Using this to give user privileges based on the user type

// Non logged in users  = "guest"
// Logged in users  = "public"
// Logged in admins  = "authenticated"

export function userRole() {
    const user = retrieveFromStorage("user");

    function userRoleType(type) {
        return type;
    }

    let role = ""

    if (user.length === 0) {
        role = "guest";
    }else{
       role = userRoleType(user.role.type)
    }

    return role;

}

