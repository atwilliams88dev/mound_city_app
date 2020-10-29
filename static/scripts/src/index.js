import css from "../../styles/main.css";
import { activeMenu } from "./home_page_scripts/activeMenu";
import { toggleNav } from "./home_page_scripts/togglenav";
import { toggleShovel } from "./home_page_scripts/toggleShovel";

window.addEventListener("DOMContentLoaded", (e) => {
  //github.com/atwilliams88dev/mound_city_app.git
  toggleNav();
  toggleShovel();
  activeMenu("Home");
});
