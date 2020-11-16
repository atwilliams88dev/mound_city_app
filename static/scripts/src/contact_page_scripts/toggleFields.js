
export function toggleFields(){
    const [hireElm, joinElm] = Array.from(document.querySelectorAll("#goalRadioGroup label"));
    function isChecked(e){
      
      if(e.target.checked){
        console.log(e.target.value + " is checked")
        return true
      }
      return false
    }
    hireElm.addEventListener("click", e=> {
      if(isChecked(e)){
        document.querySelector("#services").classList.remove("hidden")
        document.querySelector("#skills").classList.add("hidden")
      }
    })
    joinElm.addEventListener("click", e=>{
      isChecked(e)
      document.querySelector("#skills").classList.remove("hidden")
      document.querySelector("#services").classList.add("hidden")
    })
}
