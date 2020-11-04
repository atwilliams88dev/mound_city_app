
export function toggleFields(){
    const [hireElm, joinElm] = Array.from(document.querySelectorAll("#goalRadioGroup label"));
    function isChecked(e){
      
      if(e.target.checked){
        console.log(e.target.value + " is checked")
        return true
      }
      return false
    }
    function showElm (selector) {
        const hiddenElm = document.querySelector(selector);
        hiddenElm.classList.remove("hidden")
    }
    function hideElm (selector) {
        const visibleElm = document.querySelector(selector);
        visibleElm.classList.add("hidden")
    }
    hireElm.addEventListener("click", e=> {
      if(isChecked(e)){
        
      }
    })
    joinElm.addEventListener("click", e=> isChecked(e))
}
