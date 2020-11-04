const css = require("../../../styles/main.css");
const { toggleNav } = require("../togglenav");
const { activeMenu } = require("../activeMenu");
window.addEventListener("DOMContentLoaded", (e) => {
  toggleNav();
  activeMenu("Developers");
});
