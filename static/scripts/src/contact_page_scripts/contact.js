const css = require("../../../styles/main.css");
import { toggleNav } from "../togglenav";
import { activeMenu } from "../activeMenu";
import {createMasks} from "./createMasks"
import { toggleFields } from "./toggleFields";
import { hideSubmissionErrors } from "./hideSubmissionErrors";

window.addEventListener("DOMContentLoaded", (e) => {
  // COMMON NAV
  toggleNav();
  activeMenu("Contact");
  // PRINTS INPUT MASKS FOR PHONE AND EMAIL FIELDS
  createMasks();
  // HANDLE SHOWING FIELD BASED ON HIRE / JOIN
  toggleFields();
  // HIDE ERROR LIST ON CLICK OF X ICON
  hideSubmissionErrors();

  const showForm = window.location.href.includes("hire") || window.location.href.includes("join");
  const whoAreYou = document.getElementById("who");
  if(showForm){
    whoAreYou.scrollIntoView()
  }
});
