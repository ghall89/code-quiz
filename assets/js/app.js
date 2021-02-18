var quizArr = quizData();
console.log(quizArr);

var pageContent = document.querySelector("#content");
var timerDisplay = document.querySelector("#timer");

var timeLeft;

// Create start screen
var startScreen = function() {

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

    document.querySelector("#start-btn").addEventListener("click", function(){
        timer();
        clearContent();
        quizQuestion();
    });
}

// Clear content to prepare for new content
var clearContent = function() {
    pageContent.innerHTML = "";
}

// Timer function
var timer = function(){
    timeLeft = 40;

    timerDisplay.textContent = timeLeft;
    var countdown = setInterval(function(){
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            alert("Time's up!");
            clearContent();
            startScreen();
            clearInterval(countdown);
        }
    }, 1000);


}

// Draw questions
var quizQuestion = function(){
    q = 0;

    var correctAnswer = quizArr[q].correctAnswer;

    pageContent.className = "question-screen";

    var quizQuestion = document.createElement("p")
    quizQuestion.textContent = quizArr[q].question;
    pageContent.appendChild(quizQuestion);

    // Generate answers
    for(i = 0; i < 4; i++) {
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

    document.querySelector("#answer-1").addEventListener("click", function(){
        var inputAnswer = 1;
        validateAnswer(inputAnswer, correctAnswer);
    })
    document.querySelector("#answer-2").addEventListener("click", function(){
        var inputAnswer = 2;
        validateAnswer(inputAnswer, correctAnswer);
    })
    document.querySelector("#answer-3").addEventListener("click", function(){
        var inputAnswer = 3;
        validateAnswer(inputAnswer, correctAnswer);
    })
    document.querySelector("#answer-4").addEventListener("click", function(){
        var inputAnswer = 4;
        validateAnswer(inputAnswer, correctAnswer);
    })

}

// Validate Answer
function validateAnswer(inputAnswer, correctAnswer) {
    if (inputAnswer === correctAnswer) {
        alert("You are correct!");
    } else {
        alert("You are wrong!");
    }
}

// Initialize Page
startScreen();


// Quiz questions 
function quizData(){
    var quizArr = [
        {
            "question": "Question here?",
            "answer1": "Answer 1",
            "answer2": "Answer 2",
            "answer3": "Answer 3",
            "answer4": "Answer 4",
            "correctAnswer": 1
        },
        {
            "question": "Question here?",
            "answer1": "Answer 1",
            "answer2": "Answer 2",
            "answer3": "Answer 3",
            "answer4": "Answer 4",
            "correctAnswer": 1
        }
    ];

    return quizArr;
}