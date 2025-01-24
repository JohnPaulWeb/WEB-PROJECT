document.addEventListener('DOMContentLoaded', () => {
        const board = document.getElementById('board');
        const cells = Array.from(document.querySelectorAll('.cell'));
        const message = document.getElementById('message');
        const resetButton = document.getElementById('resetButton');
        
        let currentPlayer = 'X';
        let gameActive = true;
        let boardState = ['', '', '', '', '', '', '', '', '',];

        /* rows ito pre */
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];


        /* ito yung pag panalo ka */


        const checkWin = (player) => {
            return winningCombinations.some(combination => {
                return combination.every(index => {
                    return boardState[index] === player;
                });
            });
        };

        /* ito yung pag Draw yung laro */
        const checkDraw = () => {
            return boardState.every(cell => cell !== '');
        };
        /* ito yung handle click */
        const handleClick = (e) => {
            const index = e.target.getAttribute('data-index');

            if (boardState[index] !== '' || !gameActive) {
                return;
            }
            boardState[index] = currentPlayer;
            e.target.textContent = currentPlayer;

            /* ito yung pag Panalo ka */

            if (checkWin(currentPlayer)) {
                message.textContent = 'Player ${currentPlayer} Wins!';
                gameActive = false;
                return;
            }

            /* Pantay or Draw ito */

            if (checkDraw()) {
                message.textContent = 'It\'s a Draw';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        };


        /* ito yung ulit ulit */

        const resetGame = () => {
            boardState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'X';
            cells.forEach(cell => cell.textContent = '');
        };

        cells.forEach(cell => cell.addEventListener('click', handleClick));
        resetGame.addEventListener('click', resetGame);
});