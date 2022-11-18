var startButton = document.querySelector("#start-button");
var controlsEl = document.querySelector(".controls")
var questionContainer = document.querySelector("#question-container");
var questionElement = document.querySelector(".question");
var answerButtons = document.querySelector("#answer-buttons");
var timeEl = document.querySelector(".timer");
var gameOverEl = document.createElement("div");
var scoreEl = document.createElement("div");
var inputEl = document.createElement("input");
var highscoreEl = document.createElement("div");
var score = 0

var currentQuestionIndex = 0;
var secondsLeft = 10;
//array of objects containing questions and answers
var questions = [
    {
        question: "question 1",
        answers: [
            {text: "incorrect answer", correct: false},
            {text: "correct answer", correct: true},
            {text: "incorrect answer", correct: false},
            {text: "incorrect answer", correct: false}
        ]
},
    {
        question: "question 2",
        answers: [
            {text: "incorrect answer", correct: false},
            {text: "incorrect answer", correct: false},
            {text: "correct answer", correct: true},
            {text: "incorrect answer", correct: false}
        ],
},
    {
        question: "question 3",
        answers: [
            {text: "incorrect answer", correct: false},
            {text: "incorrect answer", correct: false},
            {text: "incorrect answer", correct: false},
            {text: "correct answer", correct: true}
        ],
},
    {
        question: "question 4",
        answers: [
            {text: "incorrect answer", correct: false},
            {text: "correct answer", correct: true},
            {text: "incorrect answer", correct: false},
            {text: "incorrect answer", correct: false}
    ]

},
    {
        question: "question 5",
        answers: [
            {text: "incorrect answer", correct: false},
            {text: "incorrect answer", correct: false},
            {text: "correct answer", correct: true},
            {text: "incorrect answer", correct: false}
    ],
}
]



//runs start game on click
startButton.addEventListener("click", startGame);

function startGame() {
    startButton.setAttribute("style", "display: none")
    questionContainer.setAttribute("style", "display: flex")
    nextQuestion();
    setTime();
}
//either shows the next question or game over screen
function nextQuestion () {
    if (currentQuestionIndex < 5) {
        showQuestion(questions[currentQuestionIndex]);
        console.log(currentQuestionIndex)
    } else {
        gameOver();
    }
    
}
// creates the question and buttons 
function showQuestion (chosenQuestion) {
        answerButtons.innerHTML = "";
        var question = chosenQuestion.question
        var answers = chosenQuestion.answers
        questionElement.innerHTML = question;
    for (var i = 0; i < answers.length; i++) {
        var button = document.createElement("button");
        var answer = answers[i];
        var rightAnswer = answer.correct
        button.innerHTML = answer.text;
        button.classList.add("button");
        button.setAttribute("id", rightAnswer)
        if (rightAnswer) {
            button.addEventListener("click", function() {
                currentQuestionIndex++;
                score += 100
                nextQuestion();
            }); 
        } else {
            button.addEventListener("click", function() {
                secondsLeft -= 5;
                score -= 50
            })
        }
        answerButtons.appendChild(button);
    }
}
// sets the timer
var setTime = function () {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left till game over.";

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      currentQuestionIndex += 6;
      nextQuestion();
    }

  }, 1000);
}
//shows game over screen
function gameOver () {
    questionContainer.innerHTML = ""
    timeEl.textContent = ""
    gameOverEl.innerHTML = "Game over ";
    questionContainer.appendChild(gameOverEl);
    scoreEl.setAttribute("class", "block")
    scoreEl.innerHTML = " Your score is: " + score
    questionContainer.appendChild(scoreEl)
    controlsEl.appendChild(inputEl);
    controlsEl.appendChild(highscoreEl);
    inputEl.setAttribute("class", "input")
    highscoreEl.setAttribute("class", "highscore");

    renderlastregistered();
}
//unfunctional/unfinished attempt at local storage :(
function renderlastregistered() {
    var highscore = localStorage.getItem("highscore");

    if (!highscore) {
        return;
    }

    highscoreEl.textContent = highscore;
}

function displayHighscore () {
    var highscore = document.querySelector("input").value;
    localStorage.setItem("highscore", highscore);
    renderlastregistered();
    console.log(highscore)
}
