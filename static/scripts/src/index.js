import css from "../../styles/main.css";
import { toggleNav } from "./home_page_scripts/togglenav";

window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM fully loaded and parsed2");
  toggleNav();
});
