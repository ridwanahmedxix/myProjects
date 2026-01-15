const display = document.getElementById("display");
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let userInputValue = userInput.value;
  userInput.value = "";
  const li = document.createElement("li");
  li.textContent = userInputValue;
  display.append(li);
});
