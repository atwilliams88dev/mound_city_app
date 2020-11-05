

export const hideSubmissionErrors = ()=>{
    const errorList = document.getElementById("contactErrorList");
    if(errorList) {
        const closeButton = document.getElementById("closeContactError");
        closeButton.addEventListener("click", ()=> errorList.classList.add("hidden"));
    }
}