import { updateCurrentX, updateCurrentY, currentShape, rotateShape, isCollision, generateNewShape, speed, gameLoop, renderPlayground } from './game';
import { toggleAudio } from './audio';

let score = 0;
let isPaused = false;

// Получаем элементы интерфейса
const scoreElement = document.getElementById('score')!;
const startButton = document.getElementById('start-btn')!;
const pauseButton = document.getElementById('pause-btn')!;
const audioButton = document.getElementById('audio-btn')!;

// Отображаем игровое поле (сетка)
renderPlayground();

// Обновление счета
function updateScore() {
  scoreElement.textContent = score.toString();
}

// Управление кнопками
startButton.addEventListener('click', () => {
  generateNewShape(); // Генерация новой фигуры
  gameLoop(); // Начало игрового цикла
});

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Продолжить' : 'Пауза';
});

audioButton.addEventListener('click', () => {
  toggleAudio(); // Включение/выключение музыки
});
