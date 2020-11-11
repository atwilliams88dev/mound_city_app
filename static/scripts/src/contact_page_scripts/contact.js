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

  const showForm = window.location.href.includes("hire") || window.location.href.includes("join") || document.querySelector(".inputError");
  const whoAreYou = document.getElementById("who");
  if(showForm){
    whoAreYou.scrollIntoView()
  }
  // REMOVES ERROR STATES FROM INPUT FIELDS ON KEYDOWN
  removeInputErrors()
});
