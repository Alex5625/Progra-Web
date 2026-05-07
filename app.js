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

//Trivia 5 preguntas

const preguntas = [
    {
        pregunta: "¿Qué lenguaje se usa para dar estilo a las páginas web?",
        opciones: ["HTML", "CSS", "Python", "C++"],
        correcta: 1 // Índice de 'CSS'
    },
    {
        pregunta: "¿Cuál es la capital de Chile?",
        opciones: ["Concepción", "Valparaíso", "Santiago", "Talca"],
        correcta: 2
    },
    {
        pregunta: "¿Qué significa CSS?",
        opciones: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Control Style Sheet"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es el planeta más grande del sistema solar?",
        opciones: ["Tierra", "Marte", "Júpiter", "Saturno"],
        correcta: 2
    },
    {
        pregunta: "¿En qué año se fundó la Universidad de Talca?",
        opciones: ["1981", "1990", "1975", "1985"],
        correcta: 0
    }
];

let preguntaActual = 0;
let puntaje = 0;

// Iniciar trivia al cargar
document.addEventListener("DOMContentLoaded", () => {
    mostrarPregunta();
});

function mostrarPregunta() {
    const p = preguntas[preguntaActual];
    document.getElementById("pregunta-texto").textContent = p.pregunta;
    const contenedorOpciones = document.getElementById("opciones");
    contenedorOpciones.innerHTML = ""; // Limpiar botones anteriores

    p.opciones.forEach((opcion, index) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.className = "btn btn-outline-secondary";
        boton.onclick = () => validarRespuesta(index);
        contenedorOpciones.appendChild(boton);
    });
}

function validarRespuesta(indiceSeleccionado) {
    if (indiceSeleccionado === preguntas[preguntaActual].correcta) {
        puntaje++;
        // Sonido opcional de acierto (puedes usar el de victoria del gato)
        new Audio('sounds/victory.mp3').play().catch(e => {});
    } else {
        // Sonido opcional de error (puedes usar el de lose de reacción)
        new Audio('sounds/lose.mp3').play().catch(e => {});
    }

    preguntaActual++;

    if (preguntaActual < preguntas.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    document.getElementById("quiz").classList.add("d-none");
    const resDiv = document.getElementById("trivia-resultado");
    resDiv.classList.remove("d-none");
    document.getElementById("puntaje-final").textContent = `Lograste ${puntaje} de ${preguntas.length} puntos.`;
}

function reiniciarTrivia() {
    preguntaActual = 0;
    puntaje = 0;
    document.getElementById("quiz").classList.remove("d-none");
    document.getElementById("trivia-resultado").classList.add("d-none");
    mostrarPregunta();
}

// --- LÓGICA DE TRIVIA CON TEMPORIZADOR ---

let preguntaActualT = 0;
let puntajeT = 0;
let intervaloTriviaT; 
let segundosRestantesT = 5;



function iniciarTrivia() {
    // Reiniciamos valores por si el usuario ya jugó antes
    preguntaActualT = 0;
    puntajeT = 0;
    
    // Mostramos el área de juego y ocultamos el resultado previo si existiera
    document.getElementById("trivia-inicio-cont").classList.add("d-none");
    document.getElementById("quiz-area").classList.remove("d-none");
    document.getElementById("trivia-timer-cont").classList.remove("d-none");
    document.getElementById("trivia-resultado-t").classList.add("d-none");

    // Iniciamos la primera pregunta
    mostrarPreguntaT();
}

function iniciarRelojTriviaT() {
    segundosRestantesT = 5;
    document.getElementById("tiempo-restante-t").textContent = segundosRestantesT;
    
    clearInterval(intervaloTriviaT);
    
    intervaloTriviaT = setInterval(() => {
        segundosRestantesT--;
        document.getElementById("tiempo-restante-t").textContent = segundosRestantesT;
        
        if (segundosRestantesT <= 0) {
            clearInterval(intervaloTriviaT);
            validarRespuestaT(-1); // Tiempo agotado
        }
    }, 1000);
}

function mostrarPreguntaT() {
    const p = preguntas[preguntaActualT];
    document.getElementById("pregunta-texto-t").textContent = p.pregunta;
    const contenedor = document.getElementById("opciones-t");
    contenedor.innerHTML = "";

    p.opciones.forEach((opcion, index) => {
        const boton = document.createElement("button");
        boton.textContent = opcion;
        boton.className = "btn btn-outline-secondary";
        boton.onclick = () => {
            clearInterval(intervaloTriviaT);
            validarRespuestaT(index);
        };
        contenedor.appendChild(boton);
    });

    iniciarRelojTriviaT();
}

function validarRespuestaT(indice) {
    clearInterval(intervaloTriviaT);

    if (indice === preguntas[preguntaActualT].correcta) {
        puntajeT++;
        new Audio('sounds/victory.mp3').play().catch(e => {});
    } else {
        new Audio('sounds/lose.mp3').play().catch(e => {});
    }

    preguntaActualT++;

    setTimeout(() => {
        if (preguntaActualT < preguntas.length) {
            mostrarPreguntaT();
        } else {
            finalizarTriviaT();
        }
    }, 500);
}

function finalizarTriviaT() {
    clearInterval(intervaloTriviaT);
    document.getElementById("quiz-area").classList.add("d-none");
    document.getElementById("trivia-timer-cont").classList.add("d-none");
    const resDiv = document.getElementById("trivia-resultado-t");
    resDiv.classList.remove("d-none");
    document.getElementById("puntaje-final-t").textContent = `Lograste ${puntajeT} de ${preguntas.length} puntos.`;
}

function reiniciarTriviaT() {
    preguntaActualT = 0;
    puntajeT = 0;
    document.getElementById("quiz-area").classList.remove("d-none");
    document.getElementById("trivia-timer-cont").classList.remove("d-none");
    document.getElementById("trivia-resultado-t").classList.add("d-none");
    document.getElementById("trivia-inicio-cont").classList.add("d-none");
    mostrarPreguntaT();
}

// --- LÓGICA DEL JUEGO SNAKE ---

const canvas = document.getElementById("snakeCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let snakeInterval;
let snake = [{x: 10, y: 10}];
let comida = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let tamanoGrilla = 20;
let puntajeSnake = 0;
let cambiandoDireccion = false;

function iniciarSnake() {
    // UI
    document.getElementById("snake-inicio-cont").classList.add("d-none");
    document.getElementById("snakeCanvas").classList.remove("d-none");
    document.getElementById("snake-ui").classList.remove("d-none");

    // Estado inicial
    snake = [{x: 10, y: 10}];
    generarComida();
    dx = 1; dy = 0; // Empieza moviéndose a la derecha
    puntajeSnake = 0;
    document.getElementById("snake-score").textContent = puntajeSnake;

    if (snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(buclePrincipal, 100); // Velocidad del juego (100ms)
}

function buclePrincipal() {
    if (finDelJuego()) {
        clearInterval(snakeInterval);
        alert("Juego Terminado. Puntaje: " + puntajeSnake);
        detenerSnake();
        return;
    }

    cambiandoDireccion = false;
    limpiarCanvas();
    dibujarComida();
    avanzarSerpiente();
    dibujarSerpiente();
}

function limpiarCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarSerpiente() {
    ctx.fillStyle = "#28a745"; // Color verde
    snake.forEach(parte => {
        ctx.fillRect(parte.x * tamanoGrilla, parte.y * tamanoGrilla, tamanoGrilla - 2, tamanoGrilla - 2);
    });
}

function avanzarSerpiente() {
    const cabeza = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(cabeza);

    // Si come la comida
    if (snake[0].x === comida.x && snake[0].y === comida.y) {
        puntajeSnake += 10;
        document.getElementById("snake-score").textContent = puntajeSnake;
        generarComida();
        // Sonido de acierto (reutilizando tus archivos)
        new Audio('sounds/victory.mp3').play().catch(() => {});
    } else {
        snake.pop();
    }
}

function finDelJuego() {
    // Chocar con paredes
    const chocaPared = snake[0].x < 0 || snake[0].x >= canvas.width / tamanoGrilla ||
                       snake[0].y < 0 || snake[0].y >= canvas.height / tamanoGrilla;
    
    // Chocar consigo misma
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return chocaPared;
}

function generarComida() {
    comida.x = Math.floor(Math.random() * (canvas.width / tamanoGrilla));
    comida.y = Math.floor(Math.random() * (canvas.height / tamanoGrilla));
}

function dibujarComida() {
    ctx.fillStyle = "red";
    ctx.fillRect(comida.x * tamanoGrilla, comida.y * tamanoGrilla, tamanoGrilla - 2, tamanoGrilla - 2);
}

// Control por teclado con bloqueo de scroll
document.addEventListener("keydown", (evento) => {
    // Definimos las teclas que queremos bloquear para el scroll
    const teclasJuego = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "];

    // Solo bloqueamos el comportamiento si el juego está activo (canvas visible)
    const juegoActivo = !document.getElementById("snakeCanvas").classList.contains("d-none");

    if (teclasJuego.includes(evento.key) && juegoActivo) {
        evento.preventDefault(); // Detiene el scroll del navegador
    }

    if (cambiandoDireccion || !juegoActivo) return;
    cambiandoDireccion = true;

    const tecla = evento.key;
    if (tecla === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (tecla === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
    if (tecla === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (tecla === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
});

function detenerSnake() {
    clearInterval(snakeInterval);
    document.getElementById("snakeCanvas").classList.add("d-none");
    document.getElementById("snake-ui").classList.add("d-none");
    document.getElementById("snake-inicio-cont").classList.remove("d-none");
}

// --- LÓGICA JUEGO DE REFLEJOS ---

let puntajeReflejos = 0;
let reflejosInterval;
let areaJuego = document.getElementById("area-juego-reflejos");
let objetivo = document.getElementById("objetivo");

function iniciarReflejos() {
    // UI
    document.getElementById("reflejos-inicio-cont").classList.add("d-none");
    document.getElementById("area-juego-reflejos").classList.remove("d-none");
    document.getElementById("reflejos-ui").classList.remove("d-none");

    puntajeReflejos = 0;
    document.getElementById("reflejos-score").textContent = puntajeReflejos;

    moverObjetivo();
    // Cambia de lugar automáticamente cada 1.2 segundos si no le das click
    reflejosInterval = setInterval(moverObjetivo, 1200);
}

function moverObjetivo() {
    const areaW = areaJuego.clientWidth;
    const areaH = areaJuego.clientHeight;

    // Generar posiciones aleatorias (restando el tamaño del objetivo)
    const posX = Math.floor(Math.random() * (areaW - 70));
    const posY = Math.floor(Math.random() * (areaH - 70));

    // Cambiar imagen aleatoriamente usando Picsum
    const randomId = Math.floor(Math.random() * 100);
    document.getElementById("img-reflejo").src = `https://picsum.photos/id/${randomId}/60/60`;

    // Aplicar nuevas coordenadas
    objetivo.style.left = posX + "px";
    objetivo.style.top = posY + "px";
}

let movimiento = true;
function atrapado() {
    // Sumar puntos
    
    puntajeReflejos += 10;
    document.getElementById("reflejos-score").textContent = puntajeReflejos;

    // Sonido de victoria (reutilizando tus sonidos existentes)
    if (movimiento) {
        new Audio('sounds/bongo1.mp3').play().catch(() => {});
        movimiento = false;
    } else {
        new Audio('sounds/bongo2.mp3').play().catch(() => {});
        movimiento = true;
    }

    // Reiniciar el intervalo para que no se mueva justo después de darle click
    clearInterval(reflejosInterval);
    moverObjetivo();
    reflejosInterval = setInterval(moverObjetivo, 1200);
}

function detenerReflejos() {
    clearInterval(reflejosInterval);
    document.getElementById("reflejos-inicio-cont").classList.remove("d-none");
    document.getElementById("area-juego-reflejos").classList.add("d-none");
    document.getElementById("reflejos-ui").classList.add("d-none");
}

// --- LÓGICA WHACK-A-MOLE ---

let lastHole;
let moleTimeout;
let whackScore = 0;
let whackActive = false;

function iniciarWhack() {
    // UI
    document.getElementById("mole-inicio-cont").classList.add("d-none");
    document.getElementById("whack-ui").classList.remove("d-none");
    
    // Crear los topos dentro de los agujeros si no existen
    const holes = document.querySelectorAll('.hole');
    holes.forEach(hole => {
        if (!hole.querySelector('.mole')) {
            const moleDiv = document.createElement('div');
            moleDiv.className = 'mole';
            moleDiv.onclick = hitMole;
            hole.appendChild(moleDiv);
        }
    });

    whackScore = 0;
    document.getElementById("whack-score").textContent = whackScore;
    whackActive = true;
    showMole();
}

function randomHole() {
    const holes = document.querySelectorAll('.hole');
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    
    if (hole === lastHole) return randomHole();
    lastHole = hole;
    return hole;
}

function showMole() {
    if (!whackActive) return;

    const hole = randomHole();
    const time = Math.random() * (1000 - 500) + 500; // Aparece entre 0.5 y 1 segundo
    
    hole.classList.add('up');

    moleTimeout = setTimeout(() => {
        hole.classList.remove('up');
        if (whackActive) showMole();
    }, time);
}

function hitMole() {
    if (!this.parentNode.classList.contains('up')) return; // Solo si está arriba

    whackScore += 10;
    this.parentNode.classList.remove('up'); // Se esconde al golpearlo
    document.getElementById("whack-score").textContent = whackScore;

    // Sonido de acierto
    new Audio('sounds/minecraft_hurt.mp3').play().catch(() => {});
}

function detenerWhack() {
    whackActive = false;
    clearTimeout(moleTimeout);
    document.querySelectorAll('.hole').forEach(h => h.classList.remove('up'));
    document.getElementById("mole-inicio-cont").classList.remove("d-none");
    document.getElementById("whack-ui").classList.add("d-none");
}