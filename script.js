let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a Tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Current Player: ${currentPlayer}`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Current Player: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = "");
}
