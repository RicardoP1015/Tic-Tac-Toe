const gameBoard = (() => {
    const _boardArray = ['', '', '', '', '', '', '', '', ''];

    const setBoard = (index, player) => {
        if (index > _boardArray.length) return;
        _boardArray[index] = player;
    }

    const getBoard = (index) => {
        if (index > _boardArray.length) return;
        return _boardArray[index];
    }

    const resetBoard = () => {
        for (let i = 0; i < _boardArray.length; i++) {
            _boardArray[i] = '';
        }
    }

    return { setBoard, getBoard, resetBoard, }

})()


const CreatePlayer = (playerName, playerSign) => {
    let player = playerName;
    let _sign = playerSign;

    const getSign = () => {
        return _sign;
    };

    return { player, getSign };
};


const uiControls = (() => {
    const gameField = document.querySelectorAll('.block');

    gameField.forEach((board) => {
        board.addEventListener('click', (e) => {
            if (gameController.isGameOver() || e.target.textContent !== "") return;
            gameController.playGame(parseInt(e.target.dataset.key));
            updateGameBoard()
        })
    })

    const updateGameBoard = () => {
        for (let i = 0; i < gameField.length; i++) {
            gameField[i].textContent = gameBoard.getBoard(i);
        }
    };
})();


const gameController = (() => {
    const player1 = CreatePlayer('Player1', 'X');
    const player2 = CreatePlayer('Player2', 'O');

    let round = 1;
    let gameOver = false;

    const playGame = (field) => {
        gameBoard.setBoard(field, nextPlayer());
        if (winCondition(field)) {
            console.log(`${nextPlayer()} Wins`);
            gameOver = true;
            return;
        };
        round++;

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

    return { playGame, resetGame, isGameOver }
})();





