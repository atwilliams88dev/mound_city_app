export const toggleNav = () => {
  const nav = document.querySelector("#hamburgerIcon");
  const closeSidebar = document.querySelector("#closeSidebar");
  const sidebar = document.querySelector("#sidebar");
  if (nav) {
    nav.addEventListener("click", () => {
      const isSidebarHidden = Array.from(sidebar.classList).indexOf("hidden");
      if (isSidebarHidden > -1) {
        sidebar.classList.remove("hidden");
        sidebar.classList.add("slide-right");
      }
    });
  }
  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("slide-right");
      sidebar.classList.add("slide-left");
      setTimeout(() => {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("slide-left");
      }, 300);
    });
  }
};
