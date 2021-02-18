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
}

// Clear content to prepare for new content
var clearContent = function() {
    pageContent.innerHTML = "";
}


// Timer function
var timer = function(){
    timeLeft = 10;

    var countdown = setInterval(function(){
        if (timeLeft >= 0) {
            timerDisplay.textContent = timeLeft;
            timeLeft--;
        } else {
            alert("Time's up!");
            clearInterval(countdown);
        }
    }, 1000);

}


// Initialize Page
startScreen();

// Event listeners
document.querySelector("#start-btn").addEventListener("click", function(){
    timer();
    clearContent();
});