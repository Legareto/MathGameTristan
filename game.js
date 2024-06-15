// game.js
let score = 0;
let lives = 3;
let currentAnswer = 0;

function generateProblem() {
  let num1 = Math.floor(Math.random() * 6); // Generate a number between 0 and 5
  let num2 = Math.floor(Math.random() * 6); // Generate a number between 0 and 5
  currentAnswer = num1 + num2;
  document.getElementById("problem").innerText = `${num1} + ${num2} = ?`;
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (userAnswer == currentAnswer) {
    score++;
    document.getElementById("coin-count").innerHTML = `${score} 💰`; // Update the score with the number of coins and the coin emoji
  } else {
    lives--;
    let hearts = document.querySelectorAll(".heart"); // Get all heart elements
    if (hearts.length > 0) {
      hearts[hearts.length - 1].remove(); // Remove the last heart
    }
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
  document.getElementById("coin-count").innerHTML = "0 💰"; // Reset coins
  document.getElementById("lives").innerHTML =
    '<span class="heart">❤️</span><span class="heart">❤️</span><span class="heart">❤️</span>';
  document.getElementById("reset").style.display = "none";
  generateProblem();
}

// Buy life with 5 coins
document.getElementById("buy-life").addEventListener("click", function () {
  if (score >= 5 && lives < 3) {
    score -= 5;
    lives += 1;
    document.getElementById("coin-count").innerHTML = `${score} 💰`;

    // Create a string with a heart for each life
    let livesString = "";
    for (let i = 0; i < lives; i++) {
      livesString += '<span class="heart">❤️</span>'; // Include the class="heart" attribute
    }

    // Update the #lives div
    document.getElementById(
      "lives"
    ).innerHTML = `<span class="lives-label">Vies</span> ${livesString}`;
  } else if (lives >= 3) {
    alert("Tu as déjà atteint le maximum de vies!");
  } else {
    alert("Tu n'as pas assez de pièces pour acheter une vie.");
  }
});

generateProblem();
