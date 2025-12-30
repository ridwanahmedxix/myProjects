const display = document.getElementById("display");
const UserInput = document.getElementById("UserInput");
const clickMe = document.getElementById("clickMe");

clickMe.addEventListener("click", () => {
  let inputValue = UserInput.value;
  display.textContent = inputValue;
  UserInput.value = "";
  clearBtn.style.display = "block";
});
