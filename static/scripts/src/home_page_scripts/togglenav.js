export const toggleNav = () => {
  const nav = document.querySelector("#hamburgerIcon");
  const closeSidebar = document.querySelector("#closeSidebar");
  const sidebar = document.querySelector("#sidebar");
  if (nav) {
    nav.addEventListener("click", () => {
      const isSidebarHidden = Array.from(sidebar.classList).indexOf("hidden");
      if (isSidebarHidden > -1) {
        sidebar.classList.remove("hidden");
      } else {
        sidebar.classList.add("hidden");
      }
    });
  }
  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      const isSidebarHidden = Array.from(sidebar.classList).indexOf("hidden");
      if (isSidebarHidden > -1) {
        sidebar.classList.remove("hidden");
      } else {
        sidebar.classList.add("hidden");
      }
    });
  }
};
