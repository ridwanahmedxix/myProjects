const myBtn = document.querySelector(".myBtn button ");
const rulesBox = document.querySelector(".rulesBox");
const exitBtn = document.querySelector(".exitBtn");
const questions = document.querySelector(".questions");
const contiBtn = document.querySelector(".contiBtn");

myBtn.onclick = () => {
  rulesBox.classList.add("activeInfo");
};

exitBtn.onclick = () => {
  rulesBox.classList.remove("activeInfo");
};

contiBtn.onclick = () => {
  rulesBox.classList.remove("activeInfo");
  questions.classList.add("activeQuiz");
  showQuestions();
};

function showQuestions() {
  const que_text = document.querySelector(".ParentTextWDH");
  let que_tag = "<span>" + questionsList[0].question + "</span>";
  que_text.innerHTML = que_tag;
}
