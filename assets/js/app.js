// Initialize quiz data and global variables
var q;
var timeLeft;
var gotItRight;
var highScores = [];

// Intial querey selectors
var pageContent = document.querySelector("#content");
var timerDisplay = document.querySelector("#timer");

// Create start screen
function startScreen() {

    pageContent.className = "start-screen";

    // Create title element
    var titleEl = document.createElement("h1");
    titleEl.textContent = "Coding Quiz Challenge";

    // Create intro element
    var introEl = document.createElement("p");
    introEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"

    // Create start button element
    var startBtnEl = document.createElement("button");
    startBtnEl.id = "start-btn";
    startBtnEl.textContent = "Start Quiz";

    // Draw created elements on page
    pageContent.appendChild(titleEl);
    pageContent.appendChild(introEl);
    pageContent.appendChild(startBtnEl);

    document.querySelector("#start-btn").addEventListener("click", function () {
        startQuiz();
    });
}

// Start Quiz
function startQuiz() {
    timeLeft = 99;
    q = 0;
    highScoreBtnEl.style.visibility = "hidden";
    timerDisplay.className = "";
    timer();
    quizQuestion();
}

// Clear content to prepare for new content
function clearContent() {
    pageContent.innerHTML = "";
    pageContent.className = "start-screen";
}

// Timer function
function timer() {
    timerDisplay.textContent = timeLeft;
    timeLeft--;
    var countdown = setInterval(function () {

        if (quizArr.length <= q) {
            clearInterval(countdown);
        }

        if (timeLeft <= 15){
            timerDisplay.className = "times-low";
        }

        if (timeLeft >= 0) {
            timerDisplay.textContent = timeLeft;
            timeLeft--;
        } else {
            youLose();
            clearInterval(countdown);
        }
    }, 1000);
}

// Draw questions
function quizQuestion() {
    clearContent();

    if (quizArr.length <= q) {
        youWin();
    } else {
        var correctAnswer = quizArr[q].correctAnswer;

        pageContent.className = "question-screen";

        var quizQuestion = document.createElement("p")
        quizQuestion.textContent = quizArr[q].question;
        pageContent.appendChild(quizQuestion);

        // Generate answers
        for (i = 0; i < 4; i++) {
            var quizAnswer = document.createElement("button");
            if (i === 0) {
                quizAnswer.id = "answer-1"
                quizAnswer.textContent = quizArr[q].answer1;
            } else if (i === 1) {
                quizAnswer.id = "answer-2"
                quizAnswer.textContent = quizArr[q].answer2;
            } else if (i === 2) {
                quizAnswer.id = "answer-3"
                quizAnswer.textContent = quizArr[q].answer3;
            } else if (i === 3) {
                quizAnswer.id = "answer-4"
                quizAnswer.textContent = quizArr[q].answer4;
            }
            pageContent.appendChild(quizAnswer);
        }

        // Event listeners for users answer
        document.querySelector("#answer-1").addEventListener("click", function () {
            var inputAnswer = 1;
            validateAnswer(inputAnswer, correctAnswer);
        })
        document.querySelector("#answer-2").addEventListener("click", function () {
            var inputAnswer = 2;
            validateAnswer(inputAnswer, correctAnswer);
        })
        document.querySelector("#answer-3").addEventListener("click", function () {
            var inputAnswer = 3;
            validateAnswer(inputAnswer, correctAnswer);
        })
        document.querySelector("#answer-4").addEventListener("click", function () {
            var inputAnswer = 4;
            validateAnswer(inputAnswer, correctAnswer);
        })
    }
}

// Validate and either move on to next question or subtract from timer
function validateAnswer(inputAnswer, correctAnswer) {
    if (inputAnswer === correctAnswer) {
        q++;
        gotItRight = true;
        quizQuestion();
        displayFeedback();
    } else {
        timeLeft = timeLeft - 10;
        gotItRight = false;
        displayFeedback();
    }
}

// Display feedback for players answer
function displayFeedback() {
    var wrongTextEl = document.createElement("h3");

    if (gotItRight) {
        wrongTextEl.className = "right-text";
        wrongTextEl.textContent = "Correct!";
    } else if (!gotItRight) {
        wrongTextEl.className = "wrong-text";
        wrongTextEl.textContent = "Incorrect!";
    }

    pageContent.appendChild(wrongTextEl);

    var timeOut = setInterval(function () {
        wrongTextEl.remove();
        clearInterval(timeOut);
    }, 1000);
}

// Display winning screen and ask player to try again
function youWin() {
    clearContent();
    highScoreBtnEl.style.visibility = "visible";

    finalScore = timeLeft;

    var winTitleEl = document.createElement("h1");
    winTitleEl.textContent = "You Win!"

    var winTextEl = document.createElement("p");
    winTextEl.textContent = "You finished the quiz with a score of " + finalScore + "!";

    var winText2El = document.createElement("p");
    winText2El.textContent = "Enter your name to save your high score.";

    var highScoreEl = document.createElement("div");
    var highScoreFormEl = document.createElement("form");

    var nameInputEl = document.createElement("input");
    nameInputEl.id = "name-input";
    var submitScoreEl = document.createElement("button");
    submitScoreEl.id = "submit-score";
    submitScoreEl.textContent = "Submit Score"

    var playBtnEl = document.createElement("button");
    playBtnEl.id = "play-again";
    playBtnEl.textContent = "Play Again!";

    pageContent.appendChild(winTitleEl);
    pageContent.appendChild(winTextEl);
    pageContent.appendChild(winText2El);
    pageContent.appendChild(highScoreEl);
    highScoreEl.appendChild(highScoreFormEl);
    highScoreFormEl.appendChild(nameInputEl);
    highScoreFormEl.appendChild(submitScoreEl);
    pageContent.appendChild(playBtnEl);

    document.querySelector("#submit-score").addEventListener("click", function (e) {

        e.preventDefault();

        var name = document.querySelector("#name-input").value;

        if (name == "") {
            alert("Please enter a name!");
            return;
        }

        recordHighScore(finalScore, name);
        highScoreEl.removeChild(highScoreFormEl);

        var submitConfirmEl = document.createElement("h3");
        submitConfirmEl.className = "right-text";
        submitConfirmEl.textContent = "Your highscore has been submitted!"

        highScoreEl.appendChild(submitConfirmEl);
    })

    document.querySelector("#play-again").addEventListener("click", function () {
        startQuiz();
    });
}

// Display losing screen and ask player to try again
function youLose() {
    clearContent();
    highScoreBtnEl.style.visibility = "visible";


    var loseTitleEl = document.createElement("h1");
    loseTitleEl.textContent = "You Lose!"

    var playBtnEl = document.createElement("button");
    playBtnEl.id = "play-again";
    playBtnEl.textContent = "Play Again!";

    pageContent.appendChild(loseTitleEl);
    pageContent.appendChild(playBtnEl);

    document.querySelector("#play-again").addEventListener("click", function () {
        startQuiz();
    });
}

// Load high scores (if applicable) and save new scores to localStorage
function recordHighScore(finalScore, name) {

    highScores = localStorage.getItem("highScores", highScores);

    var highScoreObj = {
        "name": name,
        "score": finalScore
    };
    if (highScores === null) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }
    highScores.push(highScoreObj);

    localStorage.setItem("highScores", JSON.stringify(highScores));

}

// Initialize Page
startScreen();
