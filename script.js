
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const statusMessage = document.getElementById('statusMessage');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');


const posicionesGanadoras = [
    [0, 1, 2], // Fila 1
    [3, 4, 5], // Fila 2
    [6, 7, 8], // Fila 3
    [0, 3, 6], // Columna 1
    [1, 4, 7], // Columna 2
    [2, 5, 8], // Columna 3
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundaria
];


function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // prohibe usar un recurso ya utilizado
    if (boardState[cellIndex] !== "" || !gameActive) {
        return;
    }

    
    boardState[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer === "X" ? "playerX" : "playerO");

   
    checkWin();
}


function checkWin() {
    let roundWon = false;

    // recorre la matriz
    for (let i = 0; i < posicionesGanadoras.length; i++) {
        const condicion = posicionesGanadoras[i];
        const a = boardState[condicion[0]];
        const b = boardState[condicion[1]];
        const c = boardState[condicion[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    // prueba

    if (roundWon) {
        statusMessage.innerText = `¡El jugador ${currentPlayer} ha ganado!`;
        gameActive = false;
        return;
    }


    let roundDraw = !boardState.includes("");
    if (roundDraw) {
        statusMessage.innerText = "¡Empate!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.innerText = `Turno de: ${currentPlayer}`;
}


function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusMessage.innerText = `Turno de: ${currentPlayer}`;
    
   
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("playerX", "playerO");
    });
}


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);