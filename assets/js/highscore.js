var highScoreDisplay = false;

var highScoreBtnEl = document.querySelector("#high-score-btn");

highScoreBtnEl.addEventListener("click", function(){
    if (!highScoreDisplay) {
        highScoreDisplay = true;
        highScoreBtnEl.textContent = "Back";
        clearContent();

        highScoreTitleEl = document.createElement("h1");
        highScoreTitleEl.textContent = "High Scores";

        highScoreDivEl = document.createElement("div");
        highScoreDivEl.className = "high-score-table"


        pageContent.appendChild(highScoreTitleEl);
        pageContent.appendChild(highScoreDivEl);

        displayHighScores();

    } else {
        highScoreDisplay = false;
        highScoreBtnEl.textContent = "High Scores";
        clearContent();
        startScreen();
    }
});


function displayHighScores() {
    var topHighScores = localStorage.getItem("highScores");
    topHighScores = JSON.parse(topHighScores);
    console.log(topHighScores);

    for (i = 0; i < 5; i++) {

        if (!topHighScores[i]) {
            return;
        }

        scoreEntryEl = document.createElement("div");
        scoreNameEl = document.createElement("span");
        scoreNameEl.textContent = topHighScores[i].name;
        scoreEl = document.createElement("span");
        scoreEl.textContent = topHighScores[i].score;

        highScoreDivEl.appendChild(scoreEntryEl);
        scoreEntryEl.appendChild(scoreNameEl);
        scoreEntryEl.appendChild(scoreEl);

    }


}