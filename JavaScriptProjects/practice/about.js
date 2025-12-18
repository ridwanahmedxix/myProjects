const qrInput = document.getElementById("qrInput");
const qrBtn = document.getElementById("qrBtn");
const clearDisplay = document.getElementById("clearDisplay");
const qrImg = document.getElementById("qrImg");

qrBtn.addEventListener("click", () => {
  let inputValue = qrInput;

  if (!inputValue) {
    alert("Wrong Info");
  } else {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
  }
  clearDisplay.style.display = "block";
});
