// This function hides and shows the filter.
export function openFilter() {
  const filterBtn = document.querySelector(".filter__search-icon");
  const filterBtnTwo = document.querySelector(".filter-icon-btn");
  const filter = document.querySelector(".filter__input");
  const filterTwo = document.querySelector(".filter-wrapper-inner");

  filterBtn.addEventListener("click", () => {
    filter.classList.toggle("filter-open");
    filterTwo.classList.toggle("more-filters-open");
  });

  filterBtnTwo.addEventListener("click", () => {
    filterTwo.classList.toggle("more-filters-open-desktop");
  });

  addEventListener("resize", () => {
    if (window.screen.width >= 600) {
      filter.classList.remove("filter-open");
      filterTwo.classList.remove("more-filters-open");
    }
  });
}
