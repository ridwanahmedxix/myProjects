const display = document.getElementById("display");
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let inputValue = userInput.value.trim();
  userInput.value = "";
  if (inputValue === "") {
    alert("Something Wrong");
    return;
  }
  const li = document.createElement("li");
  li.textContent = inputValue;
  display.append(li);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.append(deleteBtn);
});
