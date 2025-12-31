const display = document.getElementById("display");
const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let inputValue = userInput.value.trim();
  if (inputValue === "") {
    alert("Please write something");
    return;
  }
  userInput.value = "";

  const li = document.createElement("li");
  li.textContent = inputValue;
  display.append(li);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete_Button");

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
  li.append(deleteBtn);
});
