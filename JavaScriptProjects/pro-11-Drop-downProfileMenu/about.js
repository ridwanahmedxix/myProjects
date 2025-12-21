const clickBar = document.getElementById("clickBar");
const popup = document.getElementById("popup");

clickBar.addEventListener("click", () => {
  popup.classList.toggle("active");
});
