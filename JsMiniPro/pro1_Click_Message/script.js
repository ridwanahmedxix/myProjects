const Display = document.getElementById("Display");
const click_Me = document.getElementById("click_Me");
const parentDiv = document.querySelector(".parentDiv");

click_Me.addEventListener("click", () => {
  Display.innerText = " I LOVE YOU ";
  Display.style.display = "block";
  parentDiv.style.display = "block";
});
