const display = document.getElementById("display");
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  const inputValue = userInput.value.trim();

  // empty check
  if (inputValue === "") {
    alert("Wrong");
    return;
  }

  // create li
  const li = document.createElement("li");
  li.textContent = inputValue + " ";

  // create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  // delete functionality
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  // append delete button inside li
  li.append(deleteBtn);

  // append li to list
  display.append(li);

  // clear input
  userInput.value = "";
});
