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
  showQuestions(0);
};

function showQuestions(index) {
  const que_text = document.querySelector(".ParentTextWDH");
  const option_list = document.querySelector(".myOptions");
  let option_tag =
    "<div class='options'>" + questionsList[index].options + "</div>";

  let que_tag =
    "<span>" +
    questionsList[index].numb +
    "." +
    questionsList[index].question +
    "</span>";
  que_text.innerHTML = que_tag;

  option_list.innerHTML = option_tag;
}
