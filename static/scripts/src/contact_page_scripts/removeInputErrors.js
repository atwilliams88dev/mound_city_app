

export const removeInputErrors = ()=>{
    function removeErrorState(inputElm) {
        if(Array.from(inputElm.classList).includes("inputError")) {
          const label = inputElm.previousElementSibling;
          label.classList.remove("text-red-700")
          label.classList.remove("font-bold")
          const errorMessage = inputElm.nextElementSibling;
          errorMessage.classList.add("hidden")
          inputElm.classList.remove("inputError")
        }
    
      }
      const firstNameInput = document.querySelector('input[name="firstName"]');
      const lastNameInput = document.querySelector('input[name="lastName"]');
      const emailInput = document.querySelector('input[name="email"]');
      const phoneInput = document.querySelector('input[name="phone"]');
      firstNameInput.addEventListener("keydown", (e)=> removeErrorState(e.target) )
      lastNameInput.addEventListener("keydown", (e)=> removeErrorState(e.target) )
      emailInput.addEventListener("keydown", (e)=> removeErrorState(e.target) )
      phoneInput.addEventListener("keydown", (e)=> removeErrorState(e.target) )
}