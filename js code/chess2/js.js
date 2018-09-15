"use strict";

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры.
 * @property {{name: string, color: string, pos: string}[]} figures Фигуры в игре.
 * @property {object} figureHtml Содержит информацию о том, как отобразить фигуры на поле.
 */
const chess = {
  gameContainerEl: document.getElementById('game'),
  figures: [
    {name:'p', color:'w', pos:'a2'},
    {name:'p', color:'w', pos:'b2'},
    {name:'p', color:'w', pos:'c2'},
    {name:'p', color:'w', pos:'d2'},
    {name:'p', color:'w', pos:'e2'},
    {name:'p', color:'w', pos:'f2'},
    {name:'p', color:'w', pos:'g2'},
    {name:'p', color:'w', pos:'h2'},
    {name:'R', color:'w', pos:'a1'},
    {name:'N', color:'w', pos:'b1'},
    {name:'B', color:'w', pos:'c1'},
    {name:'Q', color:'w', pos:'d1'},
    {name:'K', color:'w', pos:'e1'},
    {name:'B', color:'w', pos:'f1'},
    {name:'N', color:'w', pos:'g1'},
    {name:'R', color:'w', pos:'h1'},

    {name:'p', color:'b', pos:'a7'},
    {name:'p', color:'b', pos:'b7'},
    {name:'p', color:'b', pos:'c7'},
    {name:'p', color:'b', pos:'d7'},
    {name:'p', color:'b', pos:'e7'},
    {name:'p', color:'b', pos:'f7'},
    {name:'p', color:'b', pos:'g7'},
    {name:'p', color:'b', pos:'h7'},
    {name:'R', color:'b', pos:'a8'},
    {name:'N', color:'b', pos:'b8'},
    {name:'B', color:'b', pos:'c8'},
    {name:'Q', color:'b', pos:'d8'},
    {name:'K', color:'b', pos:'e8'},
    {name:'B', color:'b', pos:'f8'},
    {name:'N', color:'b', pos:'g8'},
    {name:'R', color:'b', pos:'h8'},
  ],
  figureHtml: {
    pw: '&#9817;',
    Bw: '&#9815;',
    Nw: '&#9816;',
    Rw: '&#9814;',
    Qw: '&#9813;',
    Kw: '&#9812;',

    pb: '&#9823;',
    Bb: '&#9821;',
    Nb: '&#9822;',
    Rb: '&#9820;',
    Qb: '&#9819;',
    Kb: '&#9818;',
  },

  /**
   * Отображает карту (игровое поле).
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

        // Добавляем каждому полю data аттрибуты о номере колонки и номере строки.
        td.dataset.row = rows[row].toString();
        td.dataset.col = cols[col].toString();

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
          td.style.backgroundColor = "grey";
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
  },

  /**
   * Отображает фигуры на поле.
   */
  renderFigures() {
    // Перебираем все фигуры, которые есть в массиве.
    for (const figure of this.figures) {
      // Получаем колонку и строку, где стоит фигура.
      const col = figure.pos.charAt(0);
      const row = figure.pos.charAt(1);
      // Находим нужную ячейку, ставим ей innerHTML взятый из объекта this.figureHtml,
      // ключ - это два символа, имя фигуры и цвет, в итоге получим символ фигуры.
      document.querySelector(`[data-col='${col}'][data-row='${row}']`).innerHTML =
        this.figureHtml[figure.name + figure.color];
    }
  }
};

// Запускаем метод отображения карты.
chess.renderMap();
// Запускаем метод отображения фигур.
chess.renderFigures();