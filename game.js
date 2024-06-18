// game.js
let score = 0;
let lives = 3;
let currentAnswer = 0;
let isGameOver = false;

function generateProblem() {
  let num1 = Math.floor(Math.random() * 6); // Generate a number between 0 and 5
  let num2 = Math.floor(Math.random() * 6); // Generate a number between 0 and 5
  currentAnswer = num1 + num2;
  document.getElementById("problem").innerText = `${num1} + ${num2} = ?`;
}

function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (userAnswer == currentAnswer) {
    var audio = new Audio("assets/sound_correct-answer.wav");
    audio.play();
    score++;
    document.getElementById("coin-count").innerHTML = `${score} 💰`; // Update the score with the number of coins and the coin emoji
  } else {
    var audio = new Audio("assets/sound_wrong-answer.wav");
    audio.play();
    lives--;
    let hearts = document.querySelectorAll(".heart"); // Get all heart elements
    if (hearts.length > 0) {
      hearts[hearts.length - 1].remove(); // Remove the last heart
    }
    if (lives == 0) {
      isGameOver = true;
      alert("Game Over");
      document.getElementById("reset").style.display = "block";
      document.getElementById("reset").classList.add("reset-button"); // Make the reset button visible and on top
      document.getElementById("gameover").style.display = "block";
      document.getElementById("gameover").classList.add("gameover-label"); // Make the game over text visible and on top

      // Hide all elements inside the #game div except the reset button
      let elementsToHide = document.getElementById("game").children;
      for (let i = 0; i < elementsToHide.length; i++) {
        if (elementsToHide[i].id !== "reset" || "gameover") {
          elementsToHide[i].classList.add("hide-all");
        }
      }
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

  // Show all elements inside the #game div
  let elementsToHide = document.getElementById("game").children;
  for (let i = 0; i < elementsToHide.length; i++) {
    elementsToHide[i].classList.remove("hide-all");
  }

  document.getElementById("lives").innerHTML =
    '<span class="lives-label">Vies</span><span class="heart">❤️</span><span class="heart">❤️</span><span class="heart">❤️</span>';

  generateProblem();
  document.getElementById("reset").style.display = "none"; // Hide the reset button
  document.getElementById("gameover").style.display = "none"; // Hide the game over text
}

// Buy life with 5 coins
document.getElementById("buy-life").addEventListener("click", function () {
  if (score >= 5 && lives < 3) {
    var audio = new Audio("assets/sound_life.wav");
    audio.play();
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
