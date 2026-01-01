const textArea = document.getElementById("textArea");
const VowelBtn = document.getElementById("VowelBtn");
const showVowel = document.getElementById("showVowel");

VowelBtn.addEventListener("click", () => {
  if (textArea.value === "") {
    showVowel.textContent = "Please Write Someting";
    showVowel.style.color = "red";
  } else {
    let textAreaValue = textArea.value;
    let count = 0;

    for (let i = 0; i < textAreaValue.length; i++) {
      if (
        textAreaValue[i] === "a" ||
        textAreaValue[i] === "e" ||
        textAreaValue[i] === "i" ||
        textAreaValue[i] === "o" ||
        textAreaValue[i] === "u"
      ) {
        count++;
      }
    }

    showVowel.textContent = `The number of vowel ${count}`;
  }
});
