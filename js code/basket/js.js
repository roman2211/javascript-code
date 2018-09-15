"use strict";

/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 */
const basket = {
  settings: {
    countSelector: '#basket-count',
    priceSelector: '#basket-price',
  },
  goods: [],
  countEl: null,
  priceEl: null,

  /**
   * Инициализирует переменные для корзины и показывает эти значения.
   */
  init(settings = {}) {
    this.settings = Object.assign(this.settings, settings);
    this.countEl = document.querySelector(this.settings.countSelector);
    this.priceEl = document.querySelector(this.settings.priceSelector);
    this.render();
  },

  /**
   * Отображает количество всех товаров и их цену.
   */
  render() {
    this.countEl.textContent = this.goods.length;
    this.priceEl.textContent = this.getGoodsPrice();
  },

  /**
   * Считает и возвращает цену всех купленных товаров из массива this.goods.
   * @returns {number} Цену всех купленных товаров.
   */
  getGoodsPrice() {
    let cost = 0;
    for (const good of this.goods) {
      cost += good.price;
    }
    return cost;

    // Можно то что выше заменить просто одной строкой использовав метод reduce, этот метод проходится
    // по каждому элементу массива, перенося с собой промежуточное значение, которое в итоге мы и получим.
    // Метод reduce у массива довольно сложен для понимания, смотрите полное описание:
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
    // return this.goods.reduce((prev, current) => prev + current.price, 0);
  },

  /**
   * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
   * @param goodName Название товара.
   * @param goodPrice Цена товара.
   */
  add(goodName, goodPrice) {
    this.goods.push({name: goodName, price: goodPrice});
    this.render();
  },
};

// Инициализируем корзину.
basket.init();

// Перебираем все кнопки купить (у которых есть класс buy-btn).
document.querySelectorAll('.buy-btn').forEach(el => {
  // Каждой кнопке вешаем обработчик, при клике должны вызвать метод add у объекта basket
  // и передаем туда объект с названием и ценой товара.
  el.addEventListener('click', e => {
    basket.add(e.target.dataset.name, +e.target.dataset.price);
  })
});