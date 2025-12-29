const qrInput = document.getElementById("qrInput");
const qrBtn = document.getElementById("qrBtn");
const clearBtn = document.getElementById("clearBtn");
const qrImg = document.getElementById("qrImg");

qrBtn.addEventListener("click", () => {
  let inputValue = qrInput.value;

  if (!inputValue) {
    alert("Wrong Info");
  } else {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
    clearBtn.style.display = "block";
  }
});
