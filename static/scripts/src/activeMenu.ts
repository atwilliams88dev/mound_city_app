function handleLinkOver(item: HTMLLIElement) {
  const parent = item.parentElement;
  const children = Array.from(parent.children);
  children.forEach((child) => {
    child.setAttribute("data-active-link", "false");
  });

  item.dataset.activeLink = "true";

  // const lineOne: SVGAnimateElement = document.querySelector(
  //   'li[data-active-link="true"] .line1 animate'
  // );
}
function handleLinkOut(item: HTMLLIElement) {
  item.setAttribute("data-active-link", "false");
}

export function activeMenu(path: string): void {
  const elm = document.getElementById(path);
  if (elm) {
    elm.classList.remove("text-primary");
    elm.classList.add("text-secondary");
  } else {
    document.querySelector(`#Home`).classList.remove("text-primary");
    document.querySelector(`#Home`).classList.add("text-secondary");
  }
  const menuItems: HTMLLIElement[] = Array.from(
    document.querySelectorAll("nav li")
  );

  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      handleLinkOver(item);
    });
    item.addEventListener("mouseleave", function () {
      handleLinkOut(item);
    });
  });
}
