document.addEventListener('DOMContentLoaded', () => {
    const modeSelection = document.getElementById('modeSelection');
    const singlePlayerBtn = document.getElementById('singlePlayerBtn');
    const twoPlayerBtn = document.getElementById('twoPlayerBtn');
    const gameDiv = document.getElementById('game');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const gameOverDiv = document.getElementById('gameOver');
    const resultDiv = document.getElementById('result');
    const modal = document.getElementById('modal');
    const modalNewGameBtn = document.getElementById('modalNewGameBtn');
    const modalRestartBtn = document.getElementById('modalRestartBtn');
    const modalExitBtn = document.getElementById('modalExitBtn');
    const exitBtn = document.getElementById('exitBtn');
    const exitMainMenuBtn = document.getElementById('exitMainMenuBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    let singlePlayerMode = false;

    const checkWin = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return gameState[a];
            }
        }
        return null;
    };

    const checkDraw = () => {
        return gameState.every(cell => cell !== '');
    };

    const endGame = (winner) => {
        let resultMessage;
        if (winner === 'X' && singlePlayerMode) {
            resultMessage = 'You Won!';
        } else if (winner === 'O' && singlePlayerMode) {
            resultMessage = 'You Lost!';
        } else {
            if (winner) {
                resultMessage = `Player ${winner} wins!`;
            } else {
                resultMessage = 'It\'s a tie!';
            }
        }
        document.getElementById('modalResult').textContent = resultMessage; // Update modal with result message
        modal.style.display = 'block';
    };
    const handleClick = (e) => {
        const cellIndex = e.target.id;
        if (gameState[cellIndex] === '' && !checkWin() && !checkDraw()) {
            gameState[cellIndex] = currentPlayer;
            e.target.textContent = currentPlayer;
            const winner = checkWin();
            if (winner) {
                endGame(winner);
            } else if (checkDraw()) {
                endGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (singlePlayerMode && currentPlayer === 'O') {
                    setTimeout(computerMove, 500);
                }
            }
        }
    };
    const computerMove = () => {
        let emptyCells = [];
        gameState.forEach((cell, index) => {
            if (cell === '') {
                emptyCells.push(index);
            }
        });
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cellIndex = emptyCells[randomIndex];
        gameState[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;
        const winner = checkWin();
        if (winner) {
            endGame(winner);
        } else if (checkDraw()) {
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        gameOverDiv.style.display = 'none';
    };

    const startNewGame = () => {
        resetGame();
        modeSelection.style.display = 'flex';
        gameDiv.style.display = 'none';
        modal.style.display = 'none'; // Close modal when starting new game
    };

    singlePlayerBtn.addEventListener('click', () => {
        singlePlayerMode = true;
        modeSelection.style.display = 'none';
        gameDiv.style.display = 'flex';
    });

    twoPlayerBtn.addEventListener('click', () => {
        singlePlayerMode = false;
        modeSelection.style.display = 'none';
        gameDiv.style.display = 'flex';
    });

    cells.forEach(cell => cell.addEventListener('click', handleClick));

    modalNewGameBtn.addEventListener('click', startNewGame);

    modalRestartBtn.addEventListener('click', () => {
        resetGame();
        if (singlePlayerMode) {
            singlePlayerBtn.click();
        } else {
            twoPlayerBtn.click();
        }
        modal.style.display = 'none'; // Close modal after restart
    });

    modalExitBtn.addEventListener('click', startNewGame);
    exitBtn.addEventListener('click', startNewGame);
    exitMainMenuBtn.addEventListener('click', () => {
        window.close();
    });
    const modalMainMenuBtn = document.getElementById('modalExitBtn');
    modalMainMenuBtn.textContent = 'Main Menu';
    modalCloseBtn.addEventListener('click', startNewGame);
    modalCloseBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
