const board = document.getElementById('board');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let cells = Array.from(document.querySelectorAll('.cell'));

let currentPlayer = 'X';
let gameState = ['',  '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if(gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if(gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;  
        }
    }


    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} panalo siya`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusText.textContent = 'Ito\s a pantay';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}, ikaw na`;
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['',  '', '', '', '', '', '', '', ''];
    statusText.textContent = `Ikaw na X's susunod`;
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame)