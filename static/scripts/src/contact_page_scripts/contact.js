const css = require("../../../styles/main.css");
import { toggleNav } from "../togglenav";
import { activeMenu } from "../activeMenu";
import {createMasks} from "./createMasks"
import { toggleFields } from "./toggleFields";
import { removeInputErrors } from "./removeInputErrors";

window.addEventListener("DOMContentLoaded", (e) => {
  // COMMON NAV
  toggleNav();
  activeMenu("Contact");
  // PRINTS INPUT MASKS FOR PHONE AND EMAIL FIELDS
  createMasks();
  // HANDLE SHOWING FIELD BASED ON HIRE / JOIN
  toggleFields();
  // UpdateChecked status based on data-skills and data-services
  let skillsList = document.querySelector("#skillsWrapper")
  let serviceList = document.querySelector("#servicesWrapper")

  if(skillsList){
    let list = skillsList.dataset.skills;
    let inputs = document.querySelectorAll("#skillsWrapper input")
    inputs.forEach(input=> {
      if(list.includes(input.value)){
        input.setAttribute("checked", "true")
      }
    })
  }
  if(serviceList){

    let list = serviceList.dataset.services;
    console.log("list" + list)
    let inputs = document.querySelectorAll("#servicesWrapper input")
    inputs.forEach(input=> {
      if(list.includes(input.value)){
        input.setAttribute("checked", "true")
      }
    })
  }
  const showForm = window.location.href.includes("hire") || window.location.href.includes("join") || document.querySelector(".inputError");
  const whoAreYou = document.getElementById("who");
  if(showForm){
    whoAreYou.scrollIntoView()
  }
  // REMOVES ERROR STATES FROM INPUT FIELDS ON KEYDOWN
  removeInputErrors()
  // 


});
