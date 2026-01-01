const textArea = document.getElementById("textArea");
const countrBtn = document.getElementById("countrBtn");
const outPut = document.getElementById("outPut");

countrBtn.addEventListener("click", () => {
  if (textArea.value === "") {
    outPut.textContent = "Please Write Some Text";
    outPut.style.color = "red";
  } else {
    let areaValue = textArea.value;
    let counte = 0;

    for (let i = 0; i < areaValue.length; i++) {
      if (
        areaValue[i] === "a" ||
        areaValue[i] === "e" ||
        areaValue[i] === "i" ||
        areaValue[i] === "o" ||
        areaValue[i] === "u"
      ) {
        counte++;
      }
    }

    outPut.textContent = `The Number Of  Vowels Are ${counte}`;
  }
});
