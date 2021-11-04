//This function checks the checkbox and changes the styles of the custom checkbox.
export function doCheckbox() {
    
    const checkboxBtn = document.querySelector(".form__checkbox-btn");
    const checkbox = document.querySelector(".form__checkbox");

    checkboxBtn.addEventListener("click", function () {
        if(checkbox.checked === false) {
            checkbox.checked = true;
            checkboxBtn.style.backgroundColor = "#776274" ;
        }
        else {
            if(checkbox.checked === true) {
                checkbox.checked = false; 
                checkboxBtn.style.backgroundColor = "#ffffff";
            }   
        }
    });
}

//This function checks the checkbox and changes the styles of the custom checkbox on the product page.
export function doFilterCheckbox() {
    
    const checkboxBtn = document.querySelectorAll(".filter-checkbox-btn");

    checkboxBtn.forEach(btn => {
        btn.addEventListener("click", function () {

            const checkbox = this.parentElement.querySelector(".checkbox-filter")

            if(checkbox.checked === false) {
                checkbox.checked = true;
                this.style.backgroundColor = "#776274" ;
            }
            else {
                if(checkbox.checked === true) {
                    checkbox.checked = false; 
                    this.style.backgroundColor = "#ffffff";
                }   
            }
        });
    });
    
}