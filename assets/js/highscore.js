var highScoreDisplay = false;

var highScoreBtnEl = document.querySelector("#high-score-btn");

highScoreBtnEl.addEventListener("click", function(){
    if (!highScoreDisplay) {
        highScoreDisplay = true;
        highScoreBtnEl.textContent = "Back";
        clearContent();

        var highScoreTitleEl = document.createElement("h1");
        highScoreTitleEl.textContent = "High Scores";


        var highScoreHeadEl = document.createElement("div");
        highScoreHeadEl.className = "table-object";


        var scoreNameEl = document.createElement("span");
        scoreNameEl.textContent = "Name";
        var scoreEl = document.createElement("span");
        scoreEl.textContent = "Score";


        pageContent.appendChild(highScoreTitleEl);
        pageContent.appendChild(highScoreHeadEl);
        highScoreHeadEl.appendChild(scoreNameEl);
        highScoreHeadEl.appendChild(scoreEl);


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
    topHighScores = topHighScores.sort(function(a, b){
        return b.score - a.score;
    });

    var highScoreDivEl = document.createElement("div");
    highScoreDivEl.className = "high-score-table"
    pageContent.appendChild(highScoreDivEl);


    if(!topHighScores) {
        var noDataEl = document.createElement("h3");
        noDataEl.textContent = "No High Scores to Display";
        highScoreDivEl.appendChild(noDataEl);
        return;
    }



    for (i = 0; i < 5; i++) {

        if (!topHighScores[i]) {
            return;
        }

        var scoreEntryEl = document.createElement("div");
        scoreEntryEl.className = "table-object";
        var scoreNameEl = document.createElement("span");
        scoreNameEl.textContent = topHighScores[i].name;
        var scoreEl = document.createElement("span");
        scoreEl.textContent = topHighScores[i].score;

        highScoreDivEl.appendChild(scoreEntryEl);
        scoreEntryEl.appendChild(scoreNameEl);
        scoreEntryEl.appendChild(scoreEl);

    }


}