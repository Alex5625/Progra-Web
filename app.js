//JAVASCRIPT PARA EL TIC TAC TOE
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function makeMove(index) {
    if (!board[index] && gameActive) {
        board[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        const clickSound = new Audio('sounds/sonido_tablero.mp3');
        clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));

        checkResult();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if(gameActive) document.getElementById('status').innerText = `Turno de ${currentPlayer}`;
    }
}

function checkResult() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let win of wins) {
        if (board[win[0]] && board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]]) {
            document.getElementById('status').innerText = `¡${board[win[0]]} gana!`;
            gameActive = false;
            const clickSound = new Audio('sounds/victory.mp3');
            clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));
            return;
        }
    }
    if (!board.includes(null)) {
        document.getElementById('status').innerText = "¡Empate!";
        gameActive = false;
    }
}

function resetGame() {
    board.fill(null);
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('status').innerText = "Turno de X";
}

//JAVASCRIPT PARA EL CONTADOR INTERACTIVO

let c = 0;
let ci = 0;
let cd = 0;
let cambio = true;

function inc() {
    c = (c >= 10) ? 0 : c + 1; 
    ci = (ci >= 10) ? 0 : ci + 1; 
    const clickSound = new Audio('sounds/bongo1.mp3');
    clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));
    update();
}

function dec() {
    c = c > 0 ? c - 1 : 0; 
    cd = (cd >= 10) ? 0 : cd + 1; 
    const clickSound = new Audio('sounds/bongo2.mp3');
    clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));
    update();
}

function update() {
    incCount.textContent = ci; 
    decCount.textContent = cd; 
    count.textContent = c;    
    if (cambio) {
        document.getElementById('selector-img').src = 'images/gato_contador1.png'
        cambio = false;
    } else {
        document.getElementById('selector-img').src = 'images/gato_contador2.png'
        cambio = true
    }
}

//adivinar el numero

let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent = `${guesses.textContent} ${userGuess}`;

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!' ;
        } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);


const contenedor = document.getElementById('recuadro')

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    contenedor.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame_number);
}

function resetGame_number() {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}


// piedra, papel o tijeras
// piedra, papel o tijeras
document.addEventListener("DOMContentLoaded", () => {
    piedrapapelotijeras();
});

function piedrapapelotijeras() {
    const jugadorText = document.querySelector("#inputText");
    const compuText = document.querySelector("#computerText");
    const resultText = document.querySelector("#resultText");
    const choiceBtns = document.querySelectorAll(".choiceBtn");
    let player;
    let computer;

    choiceBtns.forEach(button => button.addEventListener("click", () => {
        // 1. Sonido al presionar el botón (interacción del usuario)
        const clickSound = new Audio('sounds/click.mp3');
        clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));

        player = button.textContent;
        computerTurn();
        jugadorText.textContent = "Tu jugada: " + player;
        compuText.textContent = "Tu contrincante: " + computer;
        
        // Determinar el resultado
        const resultado = ganador();
        resultText.textContent = resultado;

        // 2. Sonido dependiendo del resultado de la partida
        let resultSound;
        if (resultado === "Ganaste") {
            resultSound = new Audio('sounds/you_win.mp3');
        } else if (resultado === "Perdiste") {
            resultSound = new Audio('sounds/you_lose.mp3');
        } 

        resultSound.play().catch(e => console.log("Audio de resultado bloqueado:", e));
    }));

    function computerTurn() {
        const randppt = Math.floor(Math.random() * 3) + 1;
        switch(randppt) {
            case 1:
                computer = "Piedra";
                break;
            case 2:
                computer = "Papel";
                break;
            case 3:
                computer = "Tijeras";
                break;
        }
    }

    function ganador() {
        if (player === computer) {
            return "¡Empate!";
        } else if (computer === "Piedra") {
            return (player === "Papel") ? "Ganaste" : "Perdiste";
        } else if (computer === "Papel") {
            return (player === "Tijeras") ? "Ganaste" : "Perdiste";
        } else if (computer === "Tijeras") {
            return (player === "Piedra") ? "Ganaste" : "Perdiste";
        }
    }
}



// Cuenta atrás con milisegundos
// Cuenta atrás con milisegundos
let cuentaAtrasInterval;
let tiempoEnSegundos = 0.00;
let ganador = false;

function iniciarCuentaAtras() {
    const display = document.getElementById('timer-display');
    const totalTimeMs = 10000; // 10 segundos
    const startTime = Date.now();

    document.getElementById('start-btn').disabled = true;

    // Detener cualquier temporizador que ya esté corriendo antes de iniciar uno nuevo
    if (cuentaAtrasInterval) {
        clearInterval(cuentaAtrasInterval);
    }

    cuentaAtrasInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        remaining = totalTimeMs - elapsed;

        // Condición para detener el contador cuando llegue a cero
        if (remaining <= 0) {
            clearInterval(cuentaAtrasInterval);
            display.textContent = "00.00";
            return;
        }

        // Cálculos para separar los segundos de los milisegundos
        const segundos = Math.floor(remaining / 1000);
        const milisegundos = Math.floor((remaining % 1000) / 10); 

        // Dar formato de dos dígitos
        const displaySegundos = segundos < 10 ? '0' + segundos : segundos;
        const displayMilisegundos = milisegundos < 10 ? '0' + milisegundos : milisegundos;

        // Mostrar en el HTML
        display.textContent = `${displaySegundos}.${displayMilisegundos}`;

        tiempoEnSegundos = remaining / 1000;

        // Comprobamos el rango de 5 a 5.15 segundos
        if (tiempoEnSegundos >= 5.00 && tiempoEnSegundos <= 5.15) {
            document.getElementById('reaction_img').src = 'images/gato_contador1.png';
            ganador = true;
        } else {
            document.getElementById('reaction_img').src = 'images/gato_contador2.png';
            ganador = false;
        }
    }, 10); // Actualiza cada 10 milisegundos
}

function stopTime() {
    clearInterval(cuentaAtrasInterval);
    const resultado = document.getElementById('result'); // Obtiene el elemento dinámicamente
    if (ganador) {
        const clickSound = new Audio('sounds/victory.mp3');
        clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));
        resultado.textContent = 'FELICIDADES, ¡LO LOGRASTE!';
        resultado.style.backgroundColor = 'green';
    } else {
        const clickSound = new Audio('sounds/lose.mp3');
        clickSound.play().catch(e => console.log("Audio de clic bloqueado:", e));
        resultado.textContent = 'ERES MUY MALO';
        resultado.style.backgroundColor = 'red';
    }
    
}

function resetReactionGame() {
    // Detiene el temporizador en caso de que esté corriendo
    clearInterval(cuentaAtrasInterval);

    // Restablece el valor inicial de las variables
    tiempoEnSegundos = 0;
    ganador = false;

    // Restaura el texto del temporizador a 10.00
    const display = document.getElementById('timer-display');
    if (display) {
        display.textContent = "10.00";
    }

    // Vuelve a la imagen inicial
    const imgElement = document.getElementById('reaction_img');
    if (imgElement) {
        imgElement.src = 'images/gato_contador1.png';
    }

    // Limpia el recuadro de resultados y su color
    const resultado = document.getElementById('result');
    if (resultado) {
        resultado.textContent = '-';
        resultado.style.backgroundColor = 'transparent';
    }
}