const qrInput = document.getElementById("qrInput");
const qrBtn = document.getElementById("qrBtn");
const imgBtn = document.getElementById("imgBtn");
const clearBtn = document.getElementById("clearBtn");

qrBtn.addEventListener("click", () => {
  let inputValue = qrInput.value;

  if (!inputValue) {
    alert("Wrong Ifo");
  } else {
    imgBtn.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;
    clearBtn.style.display = "block";
  }
});
