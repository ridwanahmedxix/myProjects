const clickMe = document.getElementById("clickMe");
const popUp = document.getElementById("popUp");

clickMe.addEventListener("click", () => {
  if (popUp.style.display === "block") {
    popUp.style.display = "none";
  } else {
    popUp.style.display = "block";
  }
});
