// game.ts
import { shapes } from './shapes';
import { IShapes } from './interfaces';

const FIELD_WIDTH = 10;
const FIELD_HEIGHT = 20;

let currentX = 3; // Начальная позиция по X
let currentY = 0; // Начальная позиция по Y
export let currentShape = { shape: shapes['T'].shape, color: shapes['T'].color, x: currentX, y: currentY };
export let speed = 1;

let isPaused = false;

export const playground: number[][] = Array.from({ length: FIELD_HEIGHT }, () => Array(FIELD_WIDTH).fill(0));

// Функция для обновления currentX
export function updateCurrentX(value: number) {
  currentX = value;
  currentShape.x = currentX; // Обновляем x в currentShape
}

// Функция для обновления currentY
export function updateCurrentY(value: number) {
  currentY = value;
  currentShape.y = currentY; // Обновляем y в currentShape
}

export function isCollision(shape: number[][], x: number, y: number): boolean {
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

export function rotateShape(shape: number[][]): number[][] {
  const rotatedShape: number[][] = [];
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

export function generateNewShape() {
  const shapeKeys = Object.keys(shapes) as (keyof IShapes)[];
  const shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
  currentShape = { shape: shapes[shapeKey].shape, color: shapes[shapeKey].color, x: 3, y: 0 }; // Обновляем currentShape
  updateCurrentX(3); // Устанавливаем X через функцию
  updateCurrentY(0); // Устанавливаем Y через функцию
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
          const cell = document.querySelector(`.cell[data-row="${y}"][data-cell="${x}"]`) as HTMLDivElement;
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

// Основной игровой цикл
export function gameLoop() {
  setTimeout(() => {
    if (!isPaused) {
      if (!isCollision(currentShape.shape, currentShape.x, currentShape.y + 1)) {
        updateCurrentY(currentShape.y + 1); // Обновляем Y через функцию
      } else {
        fixShape();
        generateNewShape();
        if (isCollision(currentShape.shape, currentShape.x, currentShape.y)) {
          alert('Game Over!');
          return;
        }
      }
      renderShape();
      gameLoop(); // Рекурсивный вызов для продолжения цикла
    }
  }, speed * 100); // Задержка по скорости
}
