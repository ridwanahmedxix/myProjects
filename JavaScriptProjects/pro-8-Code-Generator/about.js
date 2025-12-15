const qrInput = document.getElementById("qr-input");
const qrBtn = document.getElementById("qr-btn");
const qrImg = document.getElementById("qr-img");

qrBtn.addEventListener("click", () => {
  let inputValue = qrInput.value;

  if (!inputValue) {
    alert("Wrong Info");
  } else {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
  }
});
