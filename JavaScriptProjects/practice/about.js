// const display = document.getElementById("display");
// const userInput = document.getElementById("userInput");
// const addBtn = document.getElementById("addBtn");

// addBtn.addEventListener("click", () => {
//   let InputValue = userInput.value;

//   userInput.value = "";

//   const li = document.createElement("li");

//   li.textContent = InputValue;
//   display.append(li);
// });

const display = document.getElementById("display");
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let inputValue = userInput.value;
  userInput.value = "";
  const li = document.createElement("li");
  li.textContent = inputValue;
  display.append(li);
});
