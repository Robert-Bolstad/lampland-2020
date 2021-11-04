import { retrieveFromStorage } from "../utils/localStorage.js";

// Getting the boolean value of confirmed from logged in users and storing it into a variable.
export const isConfirmed = retrieveFromStorage("user").confirmed;