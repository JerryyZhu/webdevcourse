// DOM variables
var p1Button = document.querySelector("#p1");
var p2Button = document.getElementById("p2");
var p1Display = document.getElementById("p1display");
var p2Display = document.getElementById("p2display");
var resetButton = document.getElementById("reset");
var p = document.querySelector("p");
var scoreLimitDisplay = document.querySelector("p span");
var numInput = document.querySelector("input");

// Score to manage the score
var p1Score = 0;
var p2Score = 0;
var scoreLimit = 5;
var gameOver = false;

// Event Handling
p1Button.addEventListener("click", function(){
    if(!gameOver){
        if (p1Score < scoreLimit){
            p1Score++;
            p1Display.textContent = p1Score;
            if (p1Score == scoreLimit){
                gameOver = true;
            }
        }
    }
});

p2Button.addEventListener("click", function(){
    if(!gameOver){
        if (p2Score < scoreLimit){
            p2Score++;
            p2Display.textContent = p2Score;
            if (p2Score == scoreLimit){
                gameOver = true;
            }
        }
    }
});

// Reset button, resets state
resetButton.addEventListener("click", function(){
    p1Score = 0;
    p2Score = 0;
    gameOver = false;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
});

numInput.addEventListener("change", function(){
    scoreLimitDisplay.textContent = numInput.value;
    scoreLimit = Number(numInput.value);
});


