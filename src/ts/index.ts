import { updateCurrentX, updateCurrentY, currentShape, rotateShape, isCollision, generateNewShape, speed, gameLoop } from './game';
import { toggleAudio } from './audio';

let score = 0;
let isPaused = false;

// Получаем элементы интерфейса
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const audioButton = document.getElementById('audio-btn');
const playground = document.querySelector('.game-playground');

// Отображаем игровое поле (сетка)
function renderPlayground() {
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = y;
      cell.dataset.cell = x;
      playground.appendChild(cell);
    }
  }
}

// Обновление счета
function updateScore() {
  scoreElement.textContent = score;
}

// Обновляем игровое поле
function renderShape() {
  const rowsToColor = currentShape.shape.length;
  const cellsToColor = currentShape.shape[0].length;

  // Очищаем игровое поле перед рендерингом нового блока
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove(...['T', 'S', 'Z', 'I', 'O', 'J', 'L']));

  for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
    for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
      if (currentShape.shape[rowIndex][cellIndex]) {
        const x = currentShape.x + cellIndex;
        const y = currentShape.y + rowIndex;

        if (x >= 0 && x < 10 && y >= 0 && y < 20) {
          const cell = document.querySelector(`.cell[data-row="${y}"][data-cell="${x}"]`);
          if (cell) {
            cell.classList.add(currentShape.color); // Добавляем соответствующий класс для текущей формы
          }
        }
      }
    }
  }
}

// Управление кнопками
startButton.addEventListener('click', () => {
  generateNewShape();
  gameLoop();
});

pauseButton.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? 'Продолжить' : 'Пауза';
});

audioButton.addEventListener('click', () => {
  toggleAudio();
});

// Обработчик клавиш
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') {
    if (!isCollision(currentShape.shape, currentShape.x - 1, currentShape.y)) {
      updateCurrentX(currentShape.x - 1);
    }
  } else if (e.code === 'ArrowRight') {
    if (!isCollision(currentShape.shape, currentShape.x + 1, currentShape.y)) {
      updateCurrentX(currentShape.x + 1);
    }
  } else if (e.code === 'ArrowDown') {
    if (!isCollision(currentShape.shape, currentShape.x, currentShape.y + 1)) {
      updateCurrentY(currentShape.y + 1);
    }
  } else if (e.code === 'ArrowUp') {
    const rotatedShape = rotateShape(currentShape.shape);
    if (!isCollision(rotatedShape, currentShape.x, currentShape.y)) {
      currentShape.shape = rotatedShape;
    }
  }
});

// Инициализация
renderPlayground();
generateNewShape();






// Импортируем интерфейсы и фигуры для игры
// import { IShapes } from './interfaces';
// import { shapes } from './shapes';

// // === Объявление функций ===

// // Функция для отрисовки игрового поля
// function drawTetrisPlayground(x: number, y: number, target: HTMLDivElement) {
//   if (x <= 0 || y <= 0) throw new Error('x and y cannot be negative');

//   if (target.children.length)
//     throw new Error('Aborted: target element should be empty');

//   for (let rowsCount = 0; rowsCount < y; rowsCount++) {
//     const row = document.createElement('div');
//     row.className = 'row';
//     row.dataset['row'] = rowsCount.toString();

//     for (let cellsCount = 0; cellsCount < x; cellsCount++) {
//       const cell = document.createElement('div');
//       cell.className = 'cell';
//       cell.dataset['cell'] = cellsCount.toString();
//       row.append(cell);
//     }

//     target.append(row);
//   }
// }

// // Функция для отображения зафиксированных блоков на игровом поле
// function renderFixedBlocks() {
//   for (let row = 0; row < playground.length; row++) {
//     for (let col = 0; col < playground[row].length; col++) {
//       const cell = tetrisPlaygroundTarget?.children[row]?.children[
//         col
//       ] as HTMLDivElement;
//       if (!cell) continue;

//       // Если блок зафиксирован, отобразим его цвет, иначе очистим ячейку
//       if (playground[row][col]) {
//         cell.style.backgroundColor = 'grey';
//       } else {
//         cell.style.backgroundColor = '';
//       }
//     }
//   }
// }

// // Функция для отображения движущейся фигуры на игровом поле
// function renderShape() {
//   const rowsToColor = currentShape.shape.length;
//   const cellsToColor = currentShape.shape[0].length;

//   for (let rowIndex = 0; rowIndex < rowsToColor; rowIndex++) {
//     for (let cellIndex = 0; cellIndex < cellsToColor; cellIndex++) {
//       if (currentShape.shape[rowIndex][cellIndex]) {
//         const x = currentX + cellIndex;
//         const y = currentY + rowIndex;

//         // Проверяем, не выходит ли за границы
//         if (x >= 0 && x < 10 && y >= 0 && y < 20) {
//           const cell = tetrisPlaygroundTarget?.children[y]?.children[
//             x
//           ] as HTMLDivElement;
//           if (cell) {
//             cell.style.backgroundColor = currentShape.color;
//           }
//         }
//       }
//     }
//   }
// }

// // Функция для удаления предыдущего состояния движущейся фигуры
// function removePreviousShape() {
//   const rowsToClear = currentShape.shape.length;
//   const cellsToClear = currentShape.shape[0].length;

//   for (let rowIndex = 0; rowIndex < rowsToClear; rowIndex++) {
//     for (let cellIndex = 0; cellIndex < cellsToClear; cellIndex++) {
//       if (currentShape.shape[rowIndex][cellIndex]) {
//         const x = currentX + cellIndex;
//         const y = currentY + rowIndex;

//         // Проверяем, не выходит ли за границы
//         if (x >= 0 && x < 10 && y >= 0 && y < 20) {
//           // Очищаем только если здесь нет зафиксированного блока
//           if (!playground[y][x]) {
//             const cell = tetrisPlaygroundTarget?.children[y]?.children[
//               x
//             ] as HTMLDivElement;
//             if (cell) {
//               cell.style.backgroundColor = '';
//             }
//           }
//         }
//       }
//     }
//   }
// }

// // Функция для поворота фигуры на 90 градусов
// function rotateShape(shape: number[][]): number[][] {
//   const rotatedShape: number[][] = [];
//   const rows = shape.length;
//   const cols = shape[0].length;

//   for (let col = 0; col < cols; col++) {
//     rotatedShape[col] = [];
//     for (let row = rows - 1; row >= 0; row--) {
//       rotatedShape[col][rows - 1 - row] = shape[row][col];
//     }
//   }

//   return rotatedShape;
// }

// // Функция для перемещения фигуры влево и вправо
// function moveShape(direction: number) {
//   if (!isCollision(currentShape.shape, currentX + direction, currentY)) {
//     removePreviousShape();
//     currentX += direction;
//     renderShape();
//   }
// }

// // Функция для создания игрового поля как массива
// function createPlayground() {
//   const playground = [];
//   for (let row = 0; row < 20; row++) {
//     playground[row] = new Array(10).fill(0);
//   }
//   return playground;
// }

// // Функция для генерации новой фигуры
// function generateNewShape() {
//   const shapeKeyIndex = Math.floor(Math.random() * shapeKeys.length);
//   const shapeKey = shapeKeys[shapeKeyIndex] as keyof IShapes;
//   currentShape.shape = shapes[shapeKey].shape;
//   currentShape.color = shapes[shapeKey].color;
//   currentX = 3;
//   currentY = 0;
// }

// // Проверка столкновения фигуры с границами или другими фигурами
// function isCollision(shape: number[][], x: number, y: number): boolean {
//   for (let row = 0; row < shape.length; row++) {
//     for (let col = 0; col < shape[row].length; col++) {
//       if (shape[row][col]) {
//         const newX = x + col;
//         const newY = y + row;

//         // Проверяем границы поля
//         if (newX < 0 || newX >= 10 || newY >= 20) {
//           return true;
//         }

//         // Проверяем на столкновение с зафиксированными блоками
//         if (playground[newY][newX]) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// }

// // Фиксация фигуры на игровом поле
// function fixShape() {
//   for (let row = 0; row < currentShape.shape.length; row++) {
//     for (let col = 0; col < currentShape.shape[row].length; col++) {
//       if (currentShape.shape[row][col]) {
//         playground[currentY + row][currentX + col] = 1;
//       }
//     }
//   }
// }

// // Функция для удаления заполненных линий
// function removeFullLines() {
//   for (let row = playground.length - 1; row >= 0; row--) {
//     if (playground[row].every((cell) => cell === 1)) {
//       playground.splice(row, 1);
//       playground.unshift(new Array(10).fill(0));
//     }
//   }
//   renderFixedBlocks();
// }

// // === Начало выполнения программы ===

// // Инициализируем игровое поле
// const tetrisPlaygroundTarget = document.querySelector(
//   '.tetris-playground'
// ) as HTMLDivElement | null;

// if (tetrisPlaygroundTarget) {
//   drawTetrisPlayground(10, 20, tetrisPlaygroundTarget);
// }

// // Получаем ключи фигур
// const shapeKeys = Object.keys(shapes);

// // Инициализируем текущую фигуру
// const currentShape = {
//   shape: shapes['T'].shape,
//   color: shapes['T'].color,
// };

// let currentX = 3;
// let currentY = 0;
// let speed = 1000; // Начальная скорость
// let isPaused = false;
// const playground = createPlayground();

// // Отображаем начальную фигуру
// renderShape();

// // Основной игровой цикл
// function gameLoop() {
//   setTimeout(() => {
//     if (!isPaused) {
//       if (!isCollision(currentShape.shape, currentX, currentY + 1)) {
//         removePreviousShape();
//         currentY++;
//         renderShape();
//       } else {
//         fixShape();
//         removeFullLines();
//         generateNewShape();

//         if (isCollision(currentShape.shape, currentX, currentY)) {
//           alert('Игра окончена');
//           return;
//         }

//         renderShape();
//       }
//     }
//     gameLoop();
//   }, speed);
// }

// // Запускаем игровой цикл
// gameLoop();

// // Обработчик клавиш для управления фигурой
// document.addEventListener('keydown', (e) => {
//   if (e.code === 'Space') {
//     const newShape = rotateShape(currentShape.shape);
//     if (!isCollision(newShape, currentX, currentY)) {
//       removePreviousShape();
//       currentShape.shape = newShape;
//       renderShape();
//     }
//   } else if (e.code === 'ArrowLeft') {
//     moveShape(-1);
//   } else if (e.code === 'ArrowRight') {
//     moveShape(1);
//   } else if (e.code === 'ArrowDown') {
//     speed = 100; // Ускоряем падение фигуры
//   }
// });

// // Обработчик отпускания клавиш
// document.addEventListener('keyup', (e) => {
//   if (e.code === 'ArrowDown') {
//     speed = 1000; // Возвращаем стандартную скорость
//   }
// });
