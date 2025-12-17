const display = document.getElementById("display");

function appendText(input) {
  display.value = display.value + input;
}
function clearDisplay() {
  display.value = "";
}
