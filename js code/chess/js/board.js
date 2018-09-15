;(function () {
    'use strict';

    function Board(element) {
        element = element || "board";

        // Элемент в который отрисовываем доску
        if (typeof element == "string") {
            var wrapper = document.getElementById(element);
            if (!wrapper) {
                throw new Error("Элемент " + element + " не найден!");
            }
        } else {
            wrapper = element;
        }

        let letters = "ABCDEFGH";
        let rendered = false;
        let figures = {}; // Хранилище фигур
        let CELL_SIZE = 70;

        // Отрисовывает доску
        this.render = function () {
            rendered = true;

            // удаляем все потомки у враппера
            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.firstChild);
            }

            wrapper.classList.toggle('ch-wrap', true);

            let lines = 8, columns = 8;
            for (let ln = lines; ln > 0; ln--) {
                for (let cl = 0; cl < columns; cl++) {
                    let item = document.createElement('div');
                    let letter = letters[cl];
                    let id = letter + ln;
                    item.setAttribute('id', id);
                    wrapper.appendChild(item);
                    item.classList.add('ch-item');

                    if ((ln + cl) % 2)
                        item.classList.add('ch-black');

                    // Рендерим фигуру
                    if (figures.hasOwnProperty(id)) {
                        figures[id].render(item);
                    }

                    // Рисуем нумерацию столбцов
                    if (ln == 1) {
                        let labelColumn = document.createElement('div');
                        wrapper.appendChild(labelColumn);

                        labelColumn.innerHTML = letter;
                        labelColumn.classList.add('ch-label');
                        labelColumn.style.top = (lines * CELL_SIZE + 1) + 'px';
                        labelColumn.style.left = (cl * CELL_SIZE) + 'px';
                    }
                }

                // Рисуем нумерацию строк
                let labelLine = document.createElement('div');
                wrapper.appendChild(labelLine);

                labelLine.classList.add('ch-label');
                labelLine.innerHTML = ln.toString();
                labelLine.style.top = (lines - ln) * CELL_SIZE + 'px';
                labelLine.style.left = (columns * CELL_SIZE + 1) + 'px';
            }

        };

        // Заполняет объект данных с фигурами
        this.init = function (data) {
            figures = {};

            data.forEach(function (val) {
                if (!( /^[A-H][1-8]$/.test(val.cell) )) {
                    throw "Неверная ячейка: " + val.cell;
                }

                if (figures.hasOwnProperty(val.cell)) {
                    throw "Несколько фигур в ячейке " + val.cell;
                }

                switch(val.figure) {
                    case 'Figure':
                    case 'FigureCastle':
                    case 'FigureKnight':
                    case 'FigureBishop':
                    case 'FigureQueen':
                    case 'FigureKing':
                        var figure = window[val.figure];
                        figures[val.cell] = new figure(val.cell, val.color == 'white');
                        break;
                    default:
                        throw "Неизвестный тип фигуры: " + val.figure;
                }
            }, this);

            if (rendered) {
                this.render();
            }
        };

    }

    window.Board = Board;
})();