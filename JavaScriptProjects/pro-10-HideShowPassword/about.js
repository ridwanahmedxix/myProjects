const password = document.getElementById("pass");
const icon = document.getElementById("icon");

icon.addEventListener("click", () => {
  let passValue = password.value;
  if (password.type == "password" && passValue) {
    password.type = "text";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  } else {
    password.type = "password";
    icon.classList.add("fa-eye-slash");
  }
});
