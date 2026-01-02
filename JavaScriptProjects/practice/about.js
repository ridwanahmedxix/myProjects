const display = document.getElementById("display");
const calBtn = document.getElementById("calBtn");

function appendText(input) {
  display.value = display.value + input;
}

function clearAC() {
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

calBtn.addEventListener("click", () => {
  let userInput = display.value;

  if (userInput === "") {
    alert("Please enter a value");
    return;
  }

  try {
    display.value = eval(userInput);
  } catch {
    display.value = "Error";
  }
});
