const display = document.getElementById("display");
function appendText(input) {
  display.value = display.value + input;
}

function clearDisplay() {
  display.value = "";
}

function calculation() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}
function deleteOne() {
  display.value = display.value.slice(0, -1);
}
