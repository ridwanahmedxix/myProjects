const myBtn = document.querySelector(".myBtn button ");
const rulesBox = document.querySelector(".rulesBox");
const exitBtn = document.querySelector(".exitBtn");
const questions = document.querySelector(".questions");
const contiBtn = document.querySelector(".contiBtn");
const timeCount = document.querySelector(".timeCount .timeSeconds ");
const timeLines = document.querySelector(" .questionHeader .time_lines");

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
  startTimer(15);
  startTimerLine(0);
};

const nextBtn = document.querySelector(".nextBtn");
const result_box = document.querySelector(".result_box");
const restart_quiz = document.querySelector(".buttonsLast .restart1 ");
const quit_quiz = document.querySelector(".buttonsLast .quit ");

restart_quiz.onclick = () => {
  result_box.classList.remove("activeResult");
  questions.classList.add("activeQuiz");

  que_count = 0;
  userScore = 0;
  timeValue = 15;
  widthValue = 0;

  showQuestions(que_count);

  clearInterval(counter);
  clearInterval(counterLine);

  startTimer(timeValue);
  startTimerLine(0);

  nextBtn.style.display = "none";
};

quit_quiz.onclick = () => {
  window.location.reload();
};

let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = () => {
  if (que_count < questionsList.length - 1) {
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);

    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
  } else {
    console.log("You Have Completd Your Task");
    showResultBox();
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

let tickIcon =
  '  <div class="tick icon"><i class="fa-solid fa-circle-check"></i></div> ';

let crossIcon =
  '    <div class="cross icon"><i class="fa-solid fa-circle-xmark"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);

  const option_list = document.querySelector(".myOptions");
  let userAns = answer.textContent;
  let correctAns = questionsList[que_count].answer;
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    userScore += 1;
    console.log(userScore);
    answer.classList.add("correct");
    console.log("right");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("Incorrect");
    console.log("wrong ans");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correctAns) {
        option_list.children[i].setAttribute("class", "options correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }

  nextBtn.style.display = "block";
}

function showResultBox() {
  rulesBox.classList.remove("activeInfo");
  questions.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = document.querySelector(".score_text");

  if (userScore > 3) {
    let scoreTag =
      "  <span> Congratulation On You Got <p> " +
      userScore +
      " </p> Out Of <p> " +
      questionsList.length +
      "  </p> </span> ";

    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "  <span> Carry On You Got <p> " +
      userScore +
      " </p> Out Of <p> " +
      questionsList.length +
      "  </p> </span> ";

    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "  <span> I Am Sorry You Got <p> " +
      userScore +
      " </p> Out Of <p> " +
      questionsList.length +
      "  </p> </span> ";

    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = 0 + addZero;
    }

    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 50);
  function timer() {
    time += 1;
    timeLines.style.width = time + "px";
    if (time > 319) {
      clearInterval(counterLine);
    }
  }
}
