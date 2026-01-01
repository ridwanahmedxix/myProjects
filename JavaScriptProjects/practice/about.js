const textArea = document.getElementById("textArea");
const countBtn = document.getElementById("countBtn");
const outPut = document.getElementById("outPut");

countBtn.addEventListener("click", () => {
  if (textArea.value === "") {
    outPut.textContent = " Please write something ";
    outPut.style.color = "red";
  } else {
    let areaValue = textArea.value;
    let count = 0;

    for (let i = 0; i < areaValue.length; i++) {
      if (
        areaValue[i] === "a" ||
        areaValue[i] === "e" ||
        areaValue[i] === "i" ||
        areaValue[i] === "o" ||
        areaValue[i] === "u"
      ) {
        count++;
      }
    }
    reloadBtn.style.display = "block";
    outPut.textContent = `The number of vowel ${count}`;
  }
});
