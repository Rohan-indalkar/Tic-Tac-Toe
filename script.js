let board = document.getElementById("board");
let statusText = document.getElementById("status");
let resetButton = document.getElementById("reset");

let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Create board cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

// Add click event to each cell
board.addEventListener("click", function (e) {
  if (!gameActive) return;

  const clickedCell = e.target;
  const index = clickedCell.dataset.index;

  if (!clickedCell.classList.contains("cell") || cells[index] !== "") return;

  cells[index] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
});

// Reset Game
resetButton.addEventListener("click", () => {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "";
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
});

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}
