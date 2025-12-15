const qrInput = document.getElementById("qrInput");
const qrBtn = document.getElementById("qrBtn");
const qrImg = document.getElementById("qrImg");

qrBtn.addEventListener("click", () => {
  let InputValue = qrInput.value;

  if (!qrInput) {
    alert("Wrong Info");
  } else {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInput}`;
  }
});
