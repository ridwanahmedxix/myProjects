function OpenSidebar() {
  const OpenSidebar = document.querySelector(".sideBar");
  OpenSidebar.style.display = "flex";
}

function closeSidebar() {
  const closeSidebar = document.querySelector(".sideBar");
  closeSidebar.style.display = "none";
}

document.querySelectorAll(".sideBar a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".sideBar").style.display = "none";
  });
});
