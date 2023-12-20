const gameBoard = (() => {
    const _boardArray = ['', '', '', '', '', '', '', '', ''];

    const setBoard = (index, player) => {
        if (index > _boardArray.length) return;
        _boardArray[index] = player;
    };

    const getBoard = (index) => {
        if (index > _boardArray.length) return;
        return _boardArray[index];
    };

    const resetBoard = () => {
        for (let i = 0; i < _boardArray.length; i++) {
            _boardArray[i] = '';
        };
    };

    return { setBoard, getBoard, resetBoard };

})()


const CreatePlayer = (playerSign) => {
    let _sign = playerSign;

    const getSign = () => {
        return _sign;
    };

    return { getSign };
};


const uiControls = (() => {
    const gameField = document.querySelectorAll('.block');
    const resetGame = document.querySelector('.reset-board');
    const messageBoard = document.querySelector('.player-message');

    gameField.forEach((board) => {
        board.addEventListener('click', (e) => {
            if (gameController.isGameOver() || e.target.textContent !== "") return;
            gameController.playGame(parseInt(e.target.dataset.key));
            updateGameBoard();
        });
    });

    resetGame.addEventListener('click', (e) => {
        gameBoard.resetBoard();
        gameController.resetGame();
        updateGameBoard();
        setText('Player X Turn');
    });

    const updateGameBoard = () => {
        for (let i = 0; i < gameField.length; i++) {
            gameField[i].textContent = gameBoard.getBoard(i);
        };
    };

    const winningPlayer = (winner) => {
        if (winner === "Draw") {
            setText("It's a draw!");
        } else {
            setText(`Player ${winner} Won!!!`);
        };
    };

    const setText = (message) => {
        messageBoard.textContent = message;
    };

    return { winningPlayer, setText };
})();


const gameController = (() => {
    const player1 = CreatePlayer('X');
    const player2 = CreatePlayer('O');

    let round = 1;
    let gameOver = false;

    const playGame = (field) => {
        gameBoard.setBoard(field, nextPlayer());
        if (winCondition(field)) {
            uiControls.winningPlayer(nextPlayer());
            gameOver = true;
            return;
        };
        if (round === 9) {
            uiControls.setText("Draw");
            isOver = true;
            return;
        };
        round++;
        uiControls.setText(`Player ${nextPlayer()} Turn`);
    };

    const nextPlayer = () => {
        return round % 2 === 1 ? player1.getSign() : player2.getSign();
    };

    const winCondition = (field) => {
        const winningArrays = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningArrays
            .filter((combination) => combination.includes(field))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getBoard(index) === nextPlayer()
                )
            );
    };

    const isGameOver = () => {
        return gameOver;
    };

    const resetGame = () => {
        round = 1;
        gameOver = false;
    };

    return { playGame, resetGame, isGameOver };
})();





