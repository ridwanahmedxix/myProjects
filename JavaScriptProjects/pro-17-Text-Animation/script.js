const headingText = document.getElementById("headingText");
const speedE1 = document.getElementById("speed");
const AnimationText = "My Name Is Ridwan Ahmed";

let index = 1;
let spped = 300;
writeText();

function writeText() {
  headingText.innerText = AnimationText.slice(0, index);
  index++;

  setTimeout(writeText, spped);
}
