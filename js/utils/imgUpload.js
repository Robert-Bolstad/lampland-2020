import errorMessage from "../components/errorMessage.js";

const message = document.querySelector(".message-container");
const imgUrlInput = document.querySelector(".form__img-url");
const imgPreviewBox = document.querySelector(".form__img-display");
const img = document.querySelector(".form__img");

//This function displays a preview of the image from the image URL. it also checks if the link is valid
export function imagePreview() {

    imgUrlInput.addEventListener("change", function () {
        
        message.innerHTML = "";

        const src = imgUrlInput.value.trim();
        img.src = src;

        imgPreviewBox.style.backgroundImage = `url('${src}')`;
        imgPreviewBox.style.backgroundSize = "contain";

    });
    // If the link is invalid or empty, display one of these messages
    img.addEventListener("error", function () {

        imgPreviewBox.style.backgroundImage = `url("../../img/image-photography.svg")`;
        imgPreviewBox.style.backgroundSize = "auto";

        img.src = "";

        if (imgUrlInput.value == "") {

            errorMessage("warning", "Please upload a image", ".message-container");
        }else{
            errorMessage("warning", "URL is Invalid", ".message-container");
        }

    })
};

