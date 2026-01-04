const display = document.getElementById("display");
const userInpu = document.getElementById("userInpu");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
  let inputValue = userInpu.ariaValueMax.trim();
  userInpu.value = "";

  const li = document.createElement("li");

  li.textContent = inputValue;
  display.append(li);
});
