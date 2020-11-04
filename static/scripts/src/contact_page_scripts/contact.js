const css = require("../../../styles/main.css");
import { toggleNav } from "../togglenav";
import { activeMenu } from "../activeMenu";
import {createMasks} from "./createMasks"
import { toggleFields } from "./toggleFields";

window.addEventListener("DOMContentLoaded", (e) => {
  // COMMON NAV
  toggleNav();
  activeMenu("Contact");
  // PRINTS INPUT MASKS FOR PHONE AND EMAIL FIELDS
  createMasks()
  // HANDLE SHOWING FIELD BASED ON HIRE / JOIN
  toggleFields()

});
