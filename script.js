// Game State
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');
const alertBox = document.getElementById('alertBox');

// Win Conditions (global for easy access and checkWin)
const winConditions = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6]
];

// Function to display the game status
const updateStatus = () => {
    if (!gameActive) {
        // Status will be handled by alert box if game ends
        return;
    }
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

// Function to handle a cell click
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    // If the cell is already filled or game is not active, ignore the click
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update game state and UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class for styling X/O

    // Check for win or draw
    if (window.checkWin()) { // Call the global checkWin
        return; // Game ended, checkWin handled alert
    }

    // If no win, switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(); // Update status for the next player's turn
};

// Function to check for win condition (global for verification)
window.checkWin = function() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Not all cells in this condition are filled
        }
        if (a === b && b === c) {
            roundWon = true;
            break; // Found a winner
        }
    }

    if (roundWon) {
        displayAlert(`Player ${currentPlayer} Wins!`);
        gameActive = false;
        return true;
    }

    // Check for Draw if no win and board is full
    if (!board.includes('')) {
        displayAlert("It's a Draw!");
        gameActive = false;
        return true; // Game ended in a draw
    }

    return false; // No win, no draw yet
};

// Function to display the large alert box
const displayAlert = (message) => {
    alertBox.textContent = message;
    alertBox.style.display = 'flex'; // Show the alert box
};

// Function to reset the game
const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    alertBox.style.display = 'none'; // Hide the alert box
    statusDisplay.style.display = 'block'; // Ensure status is visible

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove X/O classes
    });

    updateStatus(); // Set initial status
};

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial setup
updateStatus(); // Display initial player turn
