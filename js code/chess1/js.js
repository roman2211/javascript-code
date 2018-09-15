"use strict";

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
 */
const chess = {
  gameContainerEl: document.getElementById('game'),

  /**
   * Метод отображения карты (игрового поля).
   */
  renderMap() {
    // Строки, которые есть на поле.
    const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    // Колонки, которые есть на поле.
    const cols = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 0];

    // Пробегаемся по каждой строке.
    for (let row = 0; row < rows.length; row++) {
      // Создаем элемент строки.
      const tr = document.createElement('tr');
      // Добавляем строку в контейнер игры.
      this.gameContainerEl.appendChild(tr);

      // Пробегаемся по каждой колонке.
      for (let col = 0; col < cols.length; col++) {
        // Создаем элемент ячейки.
        const td = document.createElement('td');
        // Добавляем ячейку в строку.
        tr.appendChild(td);

        // Если либо строка, либо колонка равна 0, значит это не игровое поле.
        if (rows[row] === 0 && cols[col] !== 0) {
          // Если это верхнее или нижнее поля, отображаем какие колонки есть, 0 не выводим.
          td.innerHTML = cols[col];
        } else if (cols[col] === 0 && rows[row] !== 0) {
          // Если это левое или правое поля, отображаем цифры игрового поля, 0 не выводим.
          td.innerHTML = rows[row].toString();
        }

        // Если ячейка черная - красим ее.
        if (this.isCellIsBlack(row, col)) {
          td.style.backgroundColor = 'grey';
        }
      }
    }
  },

  /**
   * Определяет является ли ячейка черной.
   * @param {int} rowNum Номер в строке.
   * @param {int} colNum Номер в колонке.
   * @returns {boolean} true, если ячейка должна быть черной, иначе false.
   */
  isCellIsBlack(rowNum, colNum) {
    // Если ячейка боковая (не игровое поле), их красить не нужно.
    if (rowNum === 0 || colNum === 0 || rowNum === 9 || colNum === 9) {
      return false;
    }

    // Определяем по четности/нечетности строки и колонки.
    return (rowNum % 2 === 1 && colNum % 2 === 0) || (rowNum % 2 === 0 && colNum % 2 === 1);
    // Либо можно сделать проще.
    // return (rowNum + colNum) % 2 === 1;
  },
};

// Запускаем метод отображения карты.
chess.renderMap();