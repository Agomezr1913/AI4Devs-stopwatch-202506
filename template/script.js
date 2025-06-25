let timerDisplay = document.getElementById('timerDisplay');
let startBtn = document.getElementById('startBtn');
let clearBtn = document.getElementById('clearBtn');
let stopwatchModeBtn = document.getElementById('stopwatchMode');
let countdownModeBtn = document.getElementById('countdownMode');

let interval = null;
let isCountdown = false;
let isRunning = false;
let remainingTime = 0;

// Formatea el tiempo en formato HH:MM:SS
function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  let seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Actualiza el display
function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingTime);
}

// Inicializa modo cronómetro
function activateStopwatch() {
  isCountdown = false;
  stopwatchModeBtn.classList.add('active');
  countdownModeBtn.classList.remove('active');
  clearTimer();
  remainingTime = 0;
  updateDisplay();
}

// Inicializa modo cuenta regresiva
function activateCountdown() {
  isCountdown = true;
  countdownModeBtn.classList.add('active');
  stopwatchModeBtn.classList.remove('active');
  clearTimer();

  const userInput = prompt('¿Cuántos minutos quieres para la cuenta atrás?', '8');
  const minutes = parseInt(userInput);
  if (!isNaN(minutes) && minutes > 0) {
    remainingTime = minutes * 60 * 1000;
  } else {
    remainingTime = 5 * 60 * 1000; // fallback
    alert('Valor inválido. Usando 5 minutos por defecto.');
  }

  updateDisplay();
}

// Empieza la cuenta
function startTimer() {
  if (isRunning) return;
  isRunning = true;

  interval = setInterval(() => {
    if (isCountdown) {
      remainingTime -= 1000;
      if (remainingTime <= 0) {
        clearTimer();
        remainingTime = 0;
        alert('¡Tiempo terminado!');
      }
    } else {
      remainingTime += 1000;
    }
    updateDisplay();
  }, 1000);
}

// Limpia y reinicia
function clearTimer() {
  clearInterval(interval);
  isRunning = false;
}

// Eventos
startBtn.addEventListener('click', startTimer);
clearBtn.addEventListener('click', () => {
  clearTimer();
  if (isCountdown) {
    activateCountdown();
  } else {
    remainingTime = 0;
    updateDisplay();
  }
});
stopwatchModeBtn.addEventListener('click', activateStopwatch);
countdownModeBtn.addEventListener('click', activateCountdown);

// Inicialización por defecto
activateStopwatch();