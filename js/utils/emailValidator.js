// This function checks if the email is a valid email address
export function validateEmailAdress(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}