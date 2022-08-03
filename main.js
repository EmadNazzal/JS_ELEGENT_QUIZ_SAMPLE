const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const optionList = document.querySelector(".option_list");
const timeCountDown = quizBox.querySelector(".timer .time_sec");
const timeLine = quizBox.querySelector("header .time_line");
startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
};
exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  //   resultBox.style.display = "none"; //double check
};
continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(0);
  ChangeQuestionNumber(1);
  startTimer(15);
  startTimerLine(0);
};

let questionsCount = 0;
let questionTextCounter = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let studentScore = 0;

const nextBtn = document.querySelector(".next_btn");
let resultBox = document.querySelector(".result_box");
let restartQuiz = resultBox.querySelector(".buttons .restart");
let quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
  quizBox.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");

  let questionsCount = 0;
  let questionTextCounter = 1;
  let counter;
  let timeValue = 15;
  let widthValue = 0;
  let studentScore = 0;
  showQuestions(questionsCount);
  ChangeQuestionNumber(questionTextCounter);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  nextBtn.style.display = "none";
};
quitQuiz.onclick = () => {
  window.location.reload();
};
nextBtn.addEventListener("click", () => {
  if (questionsCount < questions.length - 1) {
    questionsCount++;
    questionTextCounter++;
    showQuestions(questionsCount);
    ChangeQuestionNumber(questionTextCounter);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
  } else {
    console.log("Questions Completed");
    showResultBox();
  }
});

function showQuestions(index) {
  const QuestionText = document.querySelector(".que_text");
  let QuestionTag = `<span> ${questions[index].numb}. ${questions[index].question}`;
  let OptionsTag = `<div class="option"><span> ${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>
  `;
  QuestionText.innerHTML = QuestionTag;
  optionList.innerHTML = OptionsTag;

  const option = optionList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
let tickIcon = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIcon = `<div class="icon cross"><i class="fas fa-times"></i></div>`;
optionSelected = (answer) => {
  clearInterval(counter);
  clearInterval(counterLine);

  let userAns = answer.textContent;
  let correctAns = questions[questionsCount].answer;
  let allOptions = optionList.children.length; // double check  this
  if (userAns == correctAns) {
    studentScore += 1;

    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    for (i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAns) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }
  nextBtn.style.display = "block";

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
};

const bottomQuestionsTextCounter = quizBox.querySelector(".total_que");

ChangeQuestionNumber = (index) => {
  const QuestionTextTagCounter = `<span><p>${index}</p> of out<p>${questions.length}</p> Questions</span>`;
  bottomQuestionsTextCounter.innerHTML = QuestionTextTagCounter;
};

function showResultBox() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreMark = resultBox.querySelector(".score_text");
  if (studentScore >= 5 && studentScore < 7) {
    const finalMark = `<span
    >You Got
    <p>${studentScore}</p>
    out of
    <p>${questions.length}</p></span
  >`;
    scoreMark.innerHTML = finalMark;
  } else if (studentScore >= 7) {
    const finalMark = `<span
    > <p style = "color: green;">Gongrats </p> ! You Got
    <p>${studentScore}</p>
    out of
    <p>${questions.length}</p></span
  >`;
    scoreMark.innerHTML = finalMark;
  } else {
    const finalMark = `<span
    >You Failed
    <p>${studentScore}</p>
    out of
    <p>${questions.length}</p></span
  >`;
    scoreMark.innerHTML = finalMark;
  }
}
// setting a timer to do a count down
startTimer = (time) => {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCountDown.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      timeCountDown.textContent = `00`;
    }
  }
};
// The following idea is very Important
startTimerLine = (time) => {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = `${time}px`; // the time unit increases in pexels.

    // timeCountDown.textContent = time;

    if (time > 549) {
      // time should be bigger than width = 550px
      clearInterval(counterLine);
    }
  }
};
