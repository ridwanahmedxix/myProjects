function openSidebar() {
  const openSidebar = document.querySelector(".sideBar");
  openSidebar.style.display = "flex";
}
function closeSidebar() {
  const closeSidebar = document.querySelector(".sideBar");
  closeSidebar.style.display = "none";
}

const mobileNavs = document.querySelectorAll(".mobileNav");
console.log(mobileNavs.length);
mobileNavs.forEach((el) => {
  el.addEventListener("click", () => {
    closeSidebar();
  });
});
