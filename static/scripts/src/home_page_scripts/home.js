const css = require("../../../styles/main.css");
const { toggleNav } = require("../togglenav");
const { toggleShovel } = require("./toggleShovel");
const { activeMenu } = require("../activeMenu");
const { animateHome } = require("./animate_home");

window.addEventListener("DOMContentLoaded", (e) => {
  toggleNav();
  toggleShovel();
  activeMenu("Home");
  animateHome()
});
