const board = document.querySelector('.board');
const resultText = document.querySelector('.result');

const players = {
    playerTurn: 1,
    player1: [],
    player2: [],
};

const gameVariables = {
    playerStreak: 0,
    markedSquares: [],
};

const checkMarkedSquares = (selectedSquare) => {
    if (gameVariables.markedSquares.includes(selectedSquare))
        return false;
    else {
        gameVariables.markedSquares.push(selectedSquare);
        return true;
    }
};

const drawSymbol = (selectedSquare, playerTurn) => {
    const selectedSquareElement = document.getElementById(selectedSquare);

    selectedSquareElement.innerHTML = playerTurn === 1 ? 'X' : 'O';
    selectedSquareElement.style.fontSize = 'calc(5vw + 40px)';
};

const checkResult = () => {
    const winCombinations = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ];

    winCombinations.map((c) => {
        players[`player${players.playerTurn}`].map((i) => {
            if (c.includes(i))
                gameVariables.playerStreak++;
        });

        if (gameVariables.playerStreak === 3) {
            resultText.style.fontSize = '2rem';
            resultText.innerHTML = `Player ${players.playerTurn === 1 ? 'X' : 'O'} wins!`;

            refreshPage();
        }
        else if (gameVariables.markedSquares.length === 9 && resultText.innerHTML === '') {
            resultText.style.fontSize = '2rem';
            resultText.innerHTML = `Tie!`;

            refreshPage();
        }

        gameVariables.playerStreak = 0;
    });

    changeTurn();
};

const refreshPage = () => {
    setTimeout(() => {
        location.reload();
    }, 1500);
};

const changeTurn = () => {
    if (players.playerTurn < 2)
        players.playerTurn++;
    else
        players.playerTurn = 1;
};

board.addEventListener('click', (e) => {
    const selectedSquare = e.target.id;

    if (resultText.innerHTML === '') {
        if (e.target.classList.contains('square')) {
            const validInput = checkMarkedSquares(selectedSquare);

            if (validInput) {
                players[`player${players.playerTurn}`].push(selectedSquare);

                drawSymbol(selectedSquare, players.playerTurn);

                checkResult();
            }
        }
    }
});
