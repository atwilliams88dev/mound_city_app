const css = require("../../../styles/main.css");
const { toggleNav } = require("../togglenav");
const { toggleShovel } = require("./toggleShovel");
const { activeMenu } = require("../activeMenu");

window.addEventListener("DOMContentLoaded", (e) => {
  toggleNav();
  toggleShovel();
  activeMenu("Home");
});
