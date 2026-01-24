const closeSidebar = document.getElementById("closeSidebar");
const sideBar = document.querySelector(".sideBar");

closeSidebar.addEventListener("click", () => {
  sideBar.style.display = "none";
});
