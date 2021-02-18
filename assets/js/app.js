// Initialize quiz data and global variables
var quizArr = quizData();
var q;
var timeLeft;

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
    timeLeft = 40;
    q = 0;
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
    var countdown = setInterval(function () {

        if (quizArr.length <= q) {
            clearInterval(countdown);
        }

        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
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
        console.log("You are correct!");
        q++;
        quizQuestion();
    } else {
        console.log("You are wrong!");
        timeLeft = timeLeft - 10;
    }
}

function youWin() {
    clearContent();

    var winTitleEl = document.createElement("h1");
    winTitleEl.textContent = "You Win!"

    var winTextEl = document.createElement("p");
    winTextEl.textContent = "You finished the quiz with a score of " + timeLeft + "!";

    var playBtnEl = document.createElement("button");
    playBtnEl.id = "play-again";
    playBtnEl.textContent = "Play Again!";

    pageContent.appendChild(winTitleEl);
    pageContent.appendChild(winTextEl);
    pageContent.appendChild(playBtnEl);

    document.querySelector("#play-again").addEventListener("click", function () {
        startQuiz();
    });
}

function youLose() {
    clearContent();

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

// Initialize Page
startScreen();

// Quiz questions 
function quizData() {
    var quizArr = [{
            "question": "How do you select a class in a CSS file?",
            "answer1": "#class-name",
            "answer2": ".class-name",
            "answer3": "$class-name",
            "answer4": "~class-name",
            "correctAnswer": 2
        },
        {
            "question": "This is the second question!",
            "answer1": "Answer 1",
            "answer2": "Answer 2",
            "answer3": "Answer 3",
            "answer4": "Answer 4",
            "correctAnswer": 3
        },
        {
            "question": "This is the third question!",
            "answer1": "Answer 1",
            "answer2": "Answer 2",
            "answer3": "Answer 3",
            "answer4": "Answer 4",
            "correctAnswer": 2
        }
    ];

    return quizArr;
}