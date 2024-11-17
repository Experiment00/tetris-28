import { shapes } from './shapes';
const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;
let currentX = Math.floor(Math.random() * FIELD_WIDTH); // Случайная позиция по X
let currentY = 0; // Позиция по Y всегда 0
export let currentShape = { shape: shapes['T'].shape, color: shapes['T'].color, x: currentX, y: currentY };
export let speed = 1;
let isPaused = false;
export const playground = Array.from({ length: FIELD_HEIGHT }, () => Array(FIELD_WIDTH).fill(0));
// Функция для обновления currentX
export function updateCurrentX(value) {
    currentX = value;
    currentShape.x = currentX; // Обновляем x в currentShape
}
// Функция для обновления currentY
export function updateCurrentY(value) {
    currentY = value;
    currentShape.y = currentY; // Обновляем y в currentShape
}
export function isCollision(shape, x, y) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                const newX = x + col;
                const newY = y + row;
                if (newX < 0 || newX >= FIELD_WIDTH || newY >= FIELD_HEIGHT) {
                    return true;
                }
                if (playground[newY][newX]) {
                    return true;
                }
            }
        }
    }
    return false;
}
export function rotateShape(shape) {
    const rotatedShape = [];
    const rows = shape.length;
    const cols = shape[0].length;
    for (let col = 0; col < cols; col++) {
        rotatedShape[col] = [];
        for (let row = rows - 1; row >= 0; row--) {
            rotatedShape[col][rows - 1 - row] = shape[row][col];
        }
    }
    return rotatedShape;
}
// Генерация новой фигуры в случайной позиции
export function generateNewShape() {
    const shapeKeys = Object.keys(shapes); // Получаем все фигуры
    const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)]; // Случайная фигура
    currentShape = {
        shape: shapes[shapeKey].shape,
        color: shapes[shapeKey].color,
        x: Math.floor(Math.random() * FIELD_WIDTH), // Случайная позиция по X
        y: 0, // Фигура появляется в верхней строке
    };
    updateCurrentX(currentShape.x); // Устанавливаем X
    updateCurrentY(currentShape.y); // Устанавливаем Y
}
export function renderShape() {
    const rowsToColor = currentShape.shape.length;
    const cellsToColor = currentShape.shape[0].length;
    for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
        for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
            if (currentShape.shape[rowIndex][cellIndex]) {
                const x = currentShape.x + cellIndex;
                const y = currentShape.y + rowIndex;
                if (x >= 0 && x < FIELD_WIDTH && y >= 0 && y < FIELD_HEIGHT) {
                    const cell = document.querySelector(`.cell[data-row="${y}"][data-cell="${x}"]`);
                    if (cell) {
                        cell.style.backgroundColor = currentShape.color;
                    }
                }
            }
        }
    }
}
export function fixShape() {
    for (let row = 0; row < currentShape.shape.length; row++) {
        for (let col = 0; col < currentShape.shape[row].length; col++) {
            if (currentShape.shape[row][col]) {
                playground[currentShape.y + row][currentShape.x + col] = 1;
            }
        }
    }
}
export function gameLoop() {
    setTimeout(() => {
        if (!isPaused) {
            if (!isCollision(currentShape.shape, currentShape.x, currentShape.y + 1)) {
                updateCurrentY(currentShape.y + 1); // Обновляем Y через функцию
            }
            else {
                fixShape(); // Если столкновение, фиксируем фигуру
                generateNewShape(); // Генерируем новую фигуру
                // Если снова произошло столкновение после генерации новой фигуры, то игра окончена
                if (isCollision(currentShape.shape, currentShape.x, currentShape.y)) {
                    alert('Game Over!');
                    return;
                }
            }
            renderShape(); // Отображаем текущую фигуру
            gameLoop(); // Рекурсивный вызов для продолжения цикла
        }
    }, speed * 100); // Задержка по скорости
}
// Добавляем экспорт этой функции
export function renderPlayground() {
    const playgroundElement = document.querySelector('.game-playground');
    // Убедитесь, что игровое поле очищается перед добавлением новых ячеек
    playgroundElement.innerHTML = '';
    for (let y = 0; y < FIELD_HEIGHT; y++) {
        for (let x = 0; x < FIELD_WIDTH; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = y.toString();
            cell.dataset.cell = x.toString();
            playgroundElement.appendChild(cell);
        }
    }
}
