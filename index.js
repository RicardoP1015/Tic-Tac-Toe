const gameBoard = (() => {
    const boardArray = ['','','','','','','','',''];

    const setBoard = function (num, player) {
        // sets the board for the initial sign 


    }

    const render = function () {
    // made to show the changes on the UI 
    }

    return {
        board: boardArray,
    }

})()


const CreatePlayer = (plyerSign) => {
    let sign = plyerSign;

    const getSign = () => {
        return sign;
    };

    return {
        getSign
    }
}

player1 = CreatePlayer('X');
console.log(player1);

const gameController = () => {
    // this has to be able to decide how the game goes 

    const player1 = CreatePlayer('X')
    const player2 = CreatePlayer('O')

}

