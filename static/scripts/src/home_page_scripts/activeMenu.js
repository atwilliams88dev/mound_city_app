export function activeMenu(path) {
  const elm = document.getElementById(path);
  if (elm) {
    elm.classList.remove("text-primary");
    elm.classList.add("text-secondary");
  } else {
    document.querySelector(`#Home`).classList.remove("text-primary");
    document.querySelector(`#Home`).classList.add("text-secondary");
  }
}
