const gameBoard = (() => {
    const _boardArray = ['', '', '', '', '', '', '', '', ''];

    const setBoard = (index, player) => {
        _boardArray[index] = player;
        render();
    }

    const getBoard = (index) => {
        return _boardArray[index];
    }

    const resetBoard = () => {
        for (let i = 0; i < _boardArray.length; i++) {
            _boardArray[i] = '';
        }
    }

    const render = () => {
        console.log(_boardArray);
    }

    return { setBoard, getBoard, resetBoard, }

})()


const CreatePlayer = (playerName, playerSign) => {
    let player = playerName;
    let _sign = playerSign;

    const getSign = () => {
        return _sign;
    };

    return { player, getSign }
};

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
        ]

        return winningArrays
        .filter((combination) => combination.includes(field))
        .some((possibleCombination) =>
        possibleCombination.every(
            (index) => gameBoard.getBoard(index) === nextPlayer()
        )
    );
    }

return { playGame }
}) ();

gameController.playGame(0)
gameController.playGame(3)
gameController.playGame(1)

gameController.playGame(3)
gameController.playGame(2)







