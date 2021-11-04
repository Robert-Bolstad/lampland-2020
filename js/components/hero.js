import { baseUrl } from "../settings/api.js";

// This function retrieves and displays the Hero image URL from Strapi.
export async function hero() {
  const heroImgContainer = document.querySelector(".hero");
  const heroImg = baseUrl + "/homes";

  try {
    const response = await fetch(heroImg);
    const json = await response.json();

    heroImgContainer.style.backgroundImage = `url('${json[0].url}')`;
  } catch (error) {
    console.log(error);
  }
}
