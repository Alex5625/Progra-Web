// ==========================================
// TALLER EVALUADO JS - ICB GAMES
// ==========================================

// --- 1. CONTADOR INTERACTIVO ---
let countValue = 0;
let increments = 0;
let decrements = 0;

function updateCounter() {
    document.getElementById('count').textContent = countValue;
    document.getElementById('incCount').textContent = increments;
    document.getElementById('decCount').textContent = decrements;
    // Interacción visual del gato
    document.getElementById('selector-img').src = (countValue % 2 === 0) ? 'images/gato_contador1.png' : 'images/gato_contador2.png';
}

function incrementCounter() {
    countValue = (countValue >= 10) ? 0 : countValue + 1; 
    increments++;
    new Audio('sounds/bongo1.mp3').play().catch(() => {});
    updateCounter();
}

function decrementCounter() {
    countValue = (countValue > 0) ? countValue - 1 : 0;
    decrements++;
    new Audio('sounds/bongo2.mp3').play().catch(() => {});
    updateCounter();
}


// --- 2. ADIVINA EL NÚMERO (Límite 5 intentos) ---
let secretNum = Math.floor(Math.random() * 100) + 1;
let guessAttempts = 0;
const maxAttempts = 7;

function checkGuess() {
    const input = document.getElementById('guessField');
    const userGuess = Number(input.value);
    const resultMsg = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');

    if (!userGuess || userGuess < 1 || userGuess > 100) return;

    guessAttempts++;

    if (userGuess === secretNum) {
        resultMsg.textContent = '¡Felicidades! ¡Adivinaste!';
        resultMsg.className = 'lastResult badge bg-success';
        lowOrHi.textContent = '';
        endGuessGame();
    } else if (guessAttempts >= maxAttempts) {
        resultMsg.textContent = '¡Fin! El número era ' + secretNum;
        resultMsg.className = 'lastResult badge bg-danger';
        lowOrHi.textContent = '';
        endGuessGame();
    } else {
        resultMsg.textContent = 'Incorrecto. Intentos restantes: ' + (maxAttempts - guessAttempts);
        resultMsg.className = 'lastResult badge bg-warning text-dark';
        lowOrHi.textContent = userGuess < secretNum ? 'El número es más ALTO' : 'El número es más BAJO';
    }

    input.value = '';
    input.focus();
}

function endGuessGame() {
    document.getElementById('guessField').disabled = true;
    document.querySelector('button[onclick="checkGuess()"]').disabled = true;
}


// --- 3. PIEDRA, PAPEL O TIJERA ---
function playRPS(playerChoice) {
    const choices = ["Piedra", "Papel", "Tijeras"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    new Audio('sounds/click.mp3').play().catch(() => {});

    if (playerChoice === computerChoice) {
        result = "¡Empate!";
    } else if (
        (playerChoice === "Piedra" && computerChoice === "Tijeras") ||
        (playerChoice === "Papel" && computerChoice === "Piedra") ||
        (playerChoice === "Tijeras" && computerChoice === "Papel")
    ) {
        result = "¡Ganaste!";
        new Audio('sounds/you_win.mp3').play().catch(() => {});
    } else {
        result = "Perdiste";
        new Audio('sounds/you_lose.mp3').play().catch(() => {});
    }

    document.getElementById('inputText').textContent = `Tu jugada: ${playerChoice}`;
    document.getElementById('computerText').textContent = `Computador: ${computerChoice}`;
    document.getElementById('resultText').textContent = result;
}


// --- 4. JUEGO DE REACCIÓN ---
let reactionStartTime;
let reactionTimeout;

function startReactionGame() {
    const area = document.getElementById('reaction-area');
    const result = document.getElementById('reaction-result');
    
    area.className = "bg-danger rounded my-3 d-flex align-items-center justify-content-center text-white";
    area.textContent = "Espera al Verde...";
    result.textContent = "-";
    reactionStartTime = null;
    clearTimeout(reactionTimeout);
    
    const randomDelay = Math.floor(Math.random() * 3000) + 1500;
    
    reactionTimeout = setTimeout(() => {
        area.className = "bg-success rounded my-3 d-flex align-items-center justify-content-center text-white";
        area.textContent = "¡DALE CLIC!";
        reactionStartTime = Date.now();
    }, randomDelay);
}

function handleReactionClick() {
    const area = document.getElementById('reaction-area');
    const result = document.getElementById('reaction-result');

    if (reactionStartTime) {
        const reactionTime = Date.now() - reactionStartTime;
        result.textContent = `Tu tiempo: ${reactionTime} ms`;
        area.textContent = "¡Bien hecho! Pulsa Iniciar de nuevo.";
        area.className = "bg-secondary rounded my-3 d-flex align-items-center justify-content-center text-white";
        reactionStartTime = null;
        new Audio('sounds/victory.mp3').play().catch(() => {});
    } else if (area.textContent === "Espera al Verde...") {
        clearTimeout(reactionTimeout);
        result.textContent = "¡Muy pronto! Has fallado.";
        area.textContent = "Pulsa Iniciar para reintentar";
        area.className = "bg-secondary rounded my-3 d-flex align-items-center justify-content-center text-white";
        new Audio('sounds/lose.mp3').play().catch(() => {});
    } else {
        startReactionGame();
    }
}


// --- 5. TRIVIA (Mínimo 5 preguntas) ---
const quizData = [
    { q: "¿Qué lenguaje se usa para dar estilo a las páginas web?", o: ["HTML", "CSS", "Python", "C++"], a: 1 },
    { q: "¿Cuál es la capital de Chile?", o: ["Concepción", "Valparaíso", "Santiago", "Talca"], a: 2 },
    { q: "¿Qué significa CSS?", o: ["Creative Style", "Cascading Style Sheets", "Computer System", "Control Sheet"], a: 1 },
    { q: "¿Cuál es el planeta más grande?", o: ["Tierra", "Marte", "Júpiter", "Saturno"], a: 2 },
    { q: "¿En qué año se fundó la Universidad de Talca?", o: ["1981", "1990", "1975", "1985"], a: 0 }
];
let currentQuestion = 0;
let quizScore = 0;

function loadTrivia() {
    if (currentQuestion >= quizData.length) {
        document.getElementById('quiz-container').classList.add('d-none');
        const res = document.getElementById('trivia-res');
        res.classList.remove('d-none');
        res.textContent = `Juego Terminado. Lograste ${quizScore} de ${quizData.length} puntos.`;
        return;
    }

    const q = quizData[currentQuestion];
    document.getElementById('pregunta-texto').textContent = q.q;
    const optsContainer = document.getElementById('opciones');
    optsContainer.innerHTML = '';
    
    q.o.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = "btn btn-outline-secondary btn-sm";
        btn.textContent = opt;
        btn.onclick = () => {
            if (index === q.a) {
                quizScore++;
                new Audio('sounds/victory.mp3').play().catch(() => {});
            } else {
                new Audio('sounds/lose.mp3').play().catch(() => {});
            }
            currentQuestion++;
            loadTrivia();
        };
        optsContainer.appendChild(btn);
    });
}
document.addEventListener("DOMContentLoaded", loadTrivia);


// --- 6. JUEGO DE REFLEJOS ---
let reflexScore = 0;
let reflexInterval;

function startReflex() {
    reflexScore = 0;
    document.getElementById('reflejos-score').textContent = reflexScore;
    document.getElementById('objetivo').style.display = 'block';
    clearInterval(reflexInterval);
    moverReflex();
    reflexInterval = setInterval(moverReflex, 1200);
}

function moverReflex() {
    const area = document.getElementById('area-reflejos');
    const obj = document.getElementById('objetivo');
    
    const maxX = area.clientWidth - obj.clientWidth;
    const maxY = area.clientHeight - obj.clientHeight;
    
    obj.style.left = Math.floor(Math.random() * maxX) + 'px';
    obj.style.top = Math.floor(Math.random() * maxY) + 'px';
}

function catchReflex() {
    reflexScore += 10;
    document.getElementById('reflejos-score').textContent = reflexScore;
    new Audio('sounds/bongo1.mp3').play().catch(() => {});
    clearInterval(reflexInterval);
    moverReflex();
    reflexInterval = setInterval(moverReflex, 1200); 
}


// --- 7. TRIVIA CON TEMPORIZADOR ---
let tQuestionIndex = 0;
let tScore = 0;
let tTimerInterval;
let tTimeLeft = 5;

function startTimedTrivia() {
    tQuestionIndex = 0;
    tScore = 0;
    document.getElementById('btn-iniciar-t').classList.add('d-none');
    document.getElementById('t-quiz-area').classList.remove('d-none');
    loadTimedTrivia();
}

function loadTimedTrivia() {
    if (tQuestionIndex >= quizData.length) {
        clearInterval(tTimerInterval);
        document.getElementById('t-quiz-area').classList.add('d-none');
        document.getElementById('t-timer').textContent = "Fin";
        const btn = document.getElementById('btn-iniciar-t');
        btn.classList.remove('d-none');
        btn.textContent = `Puntaje Final: ${tScore}. Jugar de nuevo`;
        return;
    }

    const q = quizData[tQuestionIndex];
    document.getElementById('t-pregunta').textContent = q.q;
    const optsContainer = document.getElementById('t-opciones');
    optsContainer.innerHTML = '';
    
    q.o.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = "btn btn-outline-primary btn-sm";
        btn.textContent = opt;
        btn.onclick = () => handleTimedAnswer(index === q.a);
        optsContainer.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    tTimeLeft = 5;
    document.getElementById('t-timer').textContent = tTimeLeft + "s";
    clearInterval(tTimerInterval);
    
    tTimerInterval = setInterval(() => {
        tTimeLeft--;
        document.getElementById('t-timer').textContent = tTimeLeft + "s";
        if (tTimeLeft <= 0) {
            handleTimedAnswer(false);
        }
    }, 1000);
}

function handleTimedAnswer(isCorrect) {
    clearInterval(tTimerInterval);
    if (isCorrect) {
        tScore++;
        new Audio('sounds/victory.mp3').play().catch(() => {});
    } else {
        new Audio('sounds/lose.mp3').play().catch(() => {});
    }
    tQuestionIndex++;
    loadTimedTrivia();
}


// --- 8. TIC TAC TOE (Gato) ---
let tictacBoard = Array(9).fill(null);
let tictacPlayer = 'X';
let tictacActive = true;

function makeMove(index) {
    if (!tictacBoard[index] && tictacActive) {
        tictacBoard[index] = tictacPlayer;
        document.querySelectorAll('.cell')[index].textContent = tictacPlayer;
        new Audio('sounds/sonido_tablero.mp3').play().catch(() => {});

        if (checkTicTacWinner()) {
            document.getElementById('status').textContent = `¡${tictacPlayer} Gana!`;
            tictacActive = false;
            new Audio('sounds/victory.mp3').play().catch(() => {});
        } else if (!tictacBoard.includes(null)) {
            document.getElementById('status').textContent = "¡Empate!";
            tictacActive = false;
        } else {
            tictacPlayer = tictacPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Turno de ${tictacPlayer}`;
        }
    }
}

function checkTicTacWinner() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some(w => tictacBoard[w[0]] && tictacBoard[w[0]] === tictacBoard[w[1]] && tictacBoard[w[0]] === tictacBoard[w[2]]);
}

function resetGame() {
    tictacBoard.fill(null);
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    tictacPlayer = 'X';
    tictacActive = true;
    document.getElementById('status').textContent = "Turno de X";
}


// --- 9. SNAKE ---
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let snakeInterval;
let snake = [];
let comida = {};
let dx = 0, dy = 0;
const gridSize = 10;
let snakeActive = false;

function startSnake() {
    if (snakeInterval) clearInterval(snakeInterval);
    snake = [{x: 5, y: 5}];
    dx = 1; dy = 0;
    snakeActive = true;
    placeComida();
    snakeInterval = setInterval(updateSnake, 150);
}

function placeComida() {
    comida = {
        x: Math.floor(Math.random() * (canvas.width / gridSize)),
        y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
}

function updateSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    if (head.x < 0 || head.x >= canvas.width/gridSize || head.y < 0 || head.y >= canvas.height/gridSize) {
        return gameOverSnake();
    }
    
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return gameOverSnake();
    }

    snake.unshift(head);

    if (head.x === comida.x && head.y === comida.y) {
        new Audio('sounds/eating.mp3').play().catch(() => {});
        placeComida();
    } else {
        snake.pop();
    }

    drawSnake();
}

function drawSnake() {
    ctx.fillStyle = "#212529"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#dc3545"; 
    ctx.fillRect(comida.x * gridSize, comida.y * gridSize, gridSize - 1, gridSize - 1);

    ctx.fillStyle = "#198754"; 
    snake.forEach(part => {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 1, gridSize - 1);
    });
}

function gameOverSnake() {
    new Audio('sounds/clapping.mp3').play().catch(() => {});

    clearInterval(snakeInterval);
    snakeActive = false;

    alert("¡Juego Terminado en Snake!");
}

document.addEventListener("keydown", (e) => {
    if (!snakeActive) return;
    const teclas = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    if (teclas.includes(e.key)) e.preventDefault(); 

    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});


// --- 10. WHACK-A-MOLE ---
let moleInterval;
let moleScore = 0;
let moleActive = false;

function startWhack() {
    moleScore = 0;
    document.getElementById('mole-score').textContent = moleScore;
    moleActive = true;
    clearInterval(moleInterval);

    moleInterval = setInterval(() => {
        const holes = document.querySelectorAll('.hole');
        
        holes.forEach(h => h.classList.remove('topo-visible'));
        
        if (!moleActive) return clearInterval(moleInterval);

        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        
        randomHole.classList.add('topo-visible');
        
        setTimeout(() => {
            if (moleActive) { 
                randomHole.classList.remove('topo-visible');
            }
        }, 850); 

    }, 1100); 
}

function hitMole(index) {
    if (!moleActive) return;
    
    const hole = document.querySelectorAll('.hole')[index];
    
    if (hole.classList.contains('topo-visible')) {
        moleScore += 10;
        document.getElementById('mole-score').textContent = moleScore;
        
        hole.classList.remove('topo-visible');
        
        new Audio('sounds/minecraft_hurt.mp3').play().catch(() => {});
    }
}