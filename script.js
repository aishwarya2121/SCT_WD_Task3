// Get all 9 boxes (cells)
const cells = document.querySelectorAll('.cell');

// Get the status text and reset button
const statusText = document.getElementById('status');
const resetbtn = document.getElementById('resetbtn');

// Keep track of the player (X starts first)
let currentPlayer = 'X';

// Make an empty board (9 empty strings)
let board = ["", "", "", "", "", "", "", "", ""];

// Game still going?
let gameActive = true;

// Winning combinations
const winningCombination = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column fixed here
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal \
    [2, 4, 6]  // Diagonal /
];

// Function: When a box is clicked
function handleClick(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    // Don't allow clicking if box is filled or game is over
    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function: Check if current player won
function checkWin() {
    return winningCombination.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

// Function: Restart game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
}

// Add event listeners to all 9 cells
cells.forEach(cell => cell.addEventListener("click", handleClick));

// Add event listener to restart button
resetbtn.addEventListener("click", resetGame);
