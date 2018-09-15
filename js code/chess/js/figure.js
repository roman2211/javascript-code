;(function () {
    'use strict';

    // Шахматная фигура (пешка)
    function Figure(position, isWhite) {
        this._isWhite = isWhite;
        this._position = position;
        this._fig = ['figure', 'figure_black'];

        // Отрисовывает фигуру
        this.render = function (element) {
            element.innerHTML = (this._isWhite)
                ? '<img src="img/' + this._fig[0] + '.png" alt="' + this._fig[0] + '">'
                : '<img src="img/' + this._fig[1] + '.png" alt="' + this._fig[1] + '">';
        };
    }

    //////////////////////////////

    // Шахматная фигура (ладья)
    function FigureCastle(position, isWhite) {
        Figure.apply(this, arguments);

        this._fig = ['castle', 'castle_black'];
    }

    //////////////////////////////

    // Шахматная фигура (конь)
    function FigureKnight(position, isWhite) {
        Figure.apply(this, arguments);

        this._fig = ['knight', 'knight_black'];
    }

    //////////////////////////////

    // Шахматная фигура (слон)
    function FigureBishop(position, isWhite) {
        Figure.apply(this, arguments);

        this._fig = ['bishop', 'bishop_black'];
    }

    //////////////////////////////

    // Шахматная фигура (ферзь)
    function FigureQueen(position, isWhite) {
        Figure.apply(this, arguments);

        this._fig = ['queen', 'queen_black'];
    }

    //////////////////////////////

    // Шахматная фигура (король)
    function FigureKing(position, isWhite) {
        Figure.apply(this, arguments);

        this._fig = ['king', 'king_black'];
    }

    //////////////////////////////

    window.Figure = Figure;
    window.FigureCastle = FigureCastle;
    window.FigureKnight = FigureKnight;
    window.FigureBishop = FigureBishop;
    window.FigureQueen = FigureQueen;
    window.FigureKing = FigureKing;

})();