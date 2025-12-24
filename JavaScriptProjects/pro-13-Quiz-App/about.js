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

const nextBtn = document.querySelector(".nextBtn");

let que_count = 0;

nextBtn.onclick = () => {
  if (que_count < questionsList.length - 1) {
    que_count++;
    showQuestions(que_count);
  } else {
    console.log("You Have Completd Your Task");
  }
};

function showQuestions(index) {
  const que_text = document.querySelector(".ParentTextWDH");
  const option_list = document.querySelector(".myOptions");
  let option_tag =
    "<div class='options'>" +
    questionsList[index].options[0] +
    "</div>" +
    "<div class='options'>" +
    questionsList[index].options[1] +
    "</div>" +
    "<div class='options'>" +
    questionsList[index].options[2] +
    "</div>" +
    "<div class='options'>" +
    questionsList[index].options[3] +
    "</div>";

  let que_tag =
    "<span>" +
    questionsList[index].numb +
    "." +
    questionsList[index].question +
    "</span>";
  que_text.innerHTML = que_tag;

  option_list.innerHTML = option_tag;

  const total_que = document.querySelector(".total_que");
  let total_queTagv = "<p>" + questionsList[index].numb + " Of 5 </p>";
  total_que.innerHTML = total_queTagv;

  const optionTa = option_list.querySelectorAll(".options");

  for (let i = 0; i < optionTa.length; i++) {
    optionTa[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAns = answer.textContent;
  let correctAns = questionsList[que_count].answer;
  if (userAns == correctAns) {
    console.log("right");
  } else {
    console.log("wrong ans");
  }
}
