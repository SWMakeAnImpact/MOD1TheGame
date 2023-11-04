// Initialize game variables
let currentPlayer; // Declare a variable to keep track of the current player
let player1Score = 0; // Initialize Player 1's score
let player2Score = 0; // Initialize Player 2's score
let questionIndex = 0; // Initialize the index to keep track of the current question

// Define the equations for the game
const equations = [
  { equation: '25 * 4', answer: 100 },
  { equation: '64 / 8', answer: 8 },
  { equation: '17 * 7', answer: 119 },
  { equation: '144 / 12', answer: 12 },
  { equation: '39 + 58', answer: 97 },
];

// Function to choose the starting player (Random)
function chooseStartingPlayer() {
  // Randomly choose the starting player, either 'player1' or 'player2'
  currentPlayer = Math.random() < 0.5 ? 'player1' : 'player2';
  document.getElementById(currentPlayer).classList.add('active'); // Highlight the current player
}

// Function to start a new game
function startGame() {
  questionIndex = 0; // Reset the question index to start from the first question
  player1Score = 0; // Reset Player 1's score
  player2Score = 0; // Reset Player 2's score
  document.getElementById('score1').textContent = player1Score; // Update Player 1's score on the HTML page
  document.getElementById('score2').textContent = player2Score; // Update Player 2's score on the HTML page
  document.getElementById('submit').disabled = false; // Enable the "Submit" button
  document.getElementById('reset').disabled = false; // Enable the "Reset" button
  chooseStartingPlayer(); // Randomly choose the starting player
  nextPlayerTurn(); // Start the game by moving to the first player's turn
}

// Function to switch to the next player's turn
function nextPlayerTurn() {
  document.getElementById('result').textContent = ''; // Clear any previous result message
  document.getElementById('answer').value = ''; // Clear the answer input field
  document.getElementById(currentPlayer).classList.remove('active'); // Remove the active highlight from the current player
  currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1'; // Switch to the other player
  document.getElementById(currentPlayer).classList.add('active'); // Highlight the new current player
  generateQuestion(); // Generate and display the next question
}

// Function to generate and display a question
function generateQuestion() {
  if (questionIndex < equations.length) {
    const currentEquation = equations[questionIndex];
    document.getElementById('equation').textContent = `What is ${currentEquation.equation}?`; // Display the current question
    questionIndex++; // Move to the next question for the next turn
  } else {
    endGame(); // If all questions are answered, end the game
  }
}

// Function to end the game and declare a winner
function endGame() {
  document.getElementById('result').textContent = ''; // Clear any previous result message
  document.getElementById('submit').disabled = true; // Disable the "Submit" button
  document.getElementById('reset').disabled = true; // Disable the "Reset" button
  if (player1Score > player2Score) {
    document.getElementById('result').textContent = 'Player 1 Wins!'; // Display Player 1 as the winner
  } else if (player2Score > player1Score) {
    document.getElementById('result').textContent = 'Player 2 Wins!'; // Display Player 2 as the winner
  } else {
    document.getElementById('result').textContent = 'It\'s a tie!'; // Display a tie if scores are equal
  }
}

// Event listener for the "Submit" button
document.getElementById('submit').addEventListener('click', function() {
  const answer = parseInt(document.getElementById('answer').value, 10); // Get the player's answer
  const currentEquation = equations[questionIndex - 1]; // Get the current question
  const correctAnswer = currentEquation.answer; // Get the correct answer for the current question

  if (answer === correctAnswer) {
    document.getElementById('result').textContent = 'You guessed it!'; // Display a success message
    if (currentPlayer === 'player1') {
      player1Score++; // Increment Player 1's score for a correct answer
      document.getElementById('score1').textContent = player1Score; // Update Player 1's score on the HTML page
    } else {
      player2Score++; // Increment Player 2's score for a correct answer
      document.getElementById('score2').textContent = player2Score; // Update Player 2's score on the HTML page
    }

    if (player1Score >= 3 || player2Score >= 3) {
      endGame(); // If a player's score reaches 3 or more, end the game
    } else {
      generateQuestion(); // Generate and display the next question
    }
  } else {
    document.getElementById('result').textContent = 'You missed it! Next player turn'; // Display an error message
    setTimeout(() => {
      document.getElementById('result').textContent = ''; // Clear the message after a delay
      nextPlayerTurn(); // Move to the next player's turn
    }, 1000); // Delay for 1 second (adjust as needed)
  }
});

// Event listener for the "Reset" button
document.getElementById('reset').addEventListener('click', function() {
  console.log("Reset button clicked"); // Debugging statement
  player1Score = 0; // Reset Player 1's score
  player2Score = 0; // Reset Player 2's score
  document.getElementById('score1').textContent = player1Score; // Update Player 1's score on the HTML page
  document.getElementById('score2').textContent = player2Score; // Update Player 2's score on the HTML page
  document.getElementById('submit').disabled = false; // Enable the "Submit" button
  document.getElementById('reset').disabled = false; // Enable the "Reset" button
  document.getElementById('result').textContent = ''; // Clear any result message
  document.getElementById(currentPlayer).classList.remove('active'); // Remove active highlight from the current player
  chooseStartingPlayer(); // Randomly choose the starting player
  nextPlayerTurn(); // Start the game by moving to the first player's turn
});


// Event listener for opening and closing the instructions modal
document.getElementById('instructionsBtn').addEventListener('click', openInstructionsModal);
document.getElementById('closeInstructions').addEventListener('click', closeInstructionsModal);

// Function to open the instructions modal
function openInstructionsModal() {
  document.getElementById('instructionsModal').style.display = 'block';
}

// Function to close the instructions modal
function closeInstructionsModal() {
  document.getElementById('instructionsModal').style.display = 'none';
}

// Start the initial game when the page loads
startGame();
