// game.js
let score = 0;
let lives = 3;
let currentAnswer = 0;

function generateProblem() {
  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let operator = Math.random() > 0.5 ? "+" : "-";
  currentAnswer = operator == "+" ? num1 + num2 : num1 - num2;
  document.getElementById(
    "problem"
  ).innerText = `${num1} ${operator} ${num2} = ?`;
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (userAnswer == currentAnswer) {
    score++;
    document.getElementById("score").innerText = `Coins: ${score}`;
  } else {
    lives--;
    let livesElement = document.getElementById("lives");
    livesElement.removeChild(livesElement.lastChild);
    if (lives == 0) {
      alert("Game Over");
      document.getElementById("reset").style.display = "block";
      return;
    }
  }
  document.getElementById("answer").value = "";
  generateProblem();
}

function resetGame() {
  score = 0;
  lives = 3;
  document.getElementById("score").innerText = `Coins: ${score}`;
  document.getElementById("lives").innerHTML =
    '<img src="heart.png"><img src="heart.png"><img src="heart.png">';
  document.getElementById("reset").style.display = "none";
  generateProblem();
}

generateProblem();

// Game Logic
// ------------
// Initialize game state variables (score, lives, etc.)
// Generate a random math problem
// Display the problem to the user
// Wait for the user to input an answer
// Check if the answer is correct
// If correct, increase the score
// If incorrect, decrease the lives
// If lives are 0, end the game
// Otherwise, go back to step 2
