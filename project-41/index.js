const closeSidebar = document.getElementById("closeSidebar");
const openSideBar = document.getElementById("openSideBar");
const sideBar = document.querySelector(".sideBar");

closeSidebar.addEventListener("click", () => {
  sideBar.style.display = "none";
});
openSideBar.addEventListener("click", () => {
  sideBar.style.display = "flex";
});
