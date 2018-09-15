"use strict";

/**
 * Объект содержащий методы для валидации.
 */
const validationMethods = {
  /**
   * Метод проверки поля по длине.
   * @param {HTMLInputElement} field Поле, которое надо проверить.
   * @param {Array} args Массив с аргументами.
   * @returns {string|null} Строку с ошибкой или null, если ошибки не было.
   */
  length(field, args) {
    // Получаем длину текста в поле.
    const valLength = field.value.length,
      sign = args[0],
      then = args[1];

    // Перебираем знак и если сравнение не сработает, записываем ошибку.
    let message = null;
    switch (sign) {
      case '>':
        if (!(valLength > then)) {
          message = `Минимальная длина поля: ${then + 1}.`;
        }
        break;
      case '<':
        if (!(valLength < then)) {
          message = `Максимальная длина поля: ${then - 1}.`;
        }
        break;
      case '>=':
        if (!(valLength >= then)) {
          message = `Минимальная длина поля: ${then}.`;
        }
        break;
      case '<=':
        if (!(valLength <= then)) {
          message = `Максимальная длина поля: ${then}.`;
        }
        break;
      case '==':
        if (valLength !== then) {
          message = `Длина поля должна равняться: ${then} символам.`;
        }
        break;
    }

    // Возвращаем ошибку.
    return message;
  },

  /**
   * Проверяет содержит ли поле только цифры.
   * @param {HTMLInputElement} field Поле, которое надо проверить.
   * @returns {string|null} Строку с ошибкой или null, если ошибки не было.
   */
  mustContainNumbers(field) {
    // Перебираем все знаки в строке.
    for (const val of field.value) {
      // Если хоть один знак не будет целым числом, отправляем ошибку.
      if (!Number.isInteger(Number.parseInt(val))) {
        return 'Поле должно содержать только цифры';
      }
    }

    // Если ошибок не было отправляем null.
    return null;
  },

  /**
   * Проверяет совпадают ли у двух полей значения.
   * @param {HTMLInputElement} field1 Поле, которое надо проверить.
   * @param {Array} args Массив с аргументами.
   * @returns {string|null} Строку с ошибкой или null, если ошибки не было.
   */
  fieldsCompatible(field1, args) {
    return field1.value !== document.querySelector(args[0]).value ? 'Поля не совпадают.' : null;
  },
};

/**
 * Объект для валидации формы.
 * @property {Array} rules Массив с правилами проверки инпутов.
 */
const form = {
  formEl: null,
  rules: null,

  /**
   * Инициализирует форму,ставим обработчик события и правила проверки.
   */
  init() {
    // Находим форму и ставим обработчик события, при отправки формы вызываем метод validate.
    this.formEl = document.querySelector('.my-form');
    this.formEl.addEventListener('submit', e => this.formSubmit(e));

    // Ставим все правила для проверки формы.
    this.rules = [
      {
        selector: 'input[name="name"]',
        methods: [
          {name: 'length', args: ['>=', 1]},
          {name: 'length', args: ['<=', 50]},
        ],
      },
      {
        selector: 'input[name="phone"]',
        methods: [
          {name: 'mustContainNumbers'},
          {name: 'length', args: ['==', 11]},
        ],
      },
      {
        selector: 'input[name="password"]',
        methods: [
          {name: 'length', args: ['>=', 5]},
          {name: 'length', args: ['<=', 50]},
        ],
      },
      {
        selector: 'input[name="password_repeat"]',
        methods: [
          {name: 'fieldsCompatible', args: ['input[name="password"]']},
        ],
      },
    ];
  },

  /**
   * Метод, который запускается перед отправкой формы.
   * @param {Event} e Событие отправки формы.
   */
  formSubmit(e) {
    if (!this.validate()) {
      e.preventDefault();
    }
  },

  /**
   * Валидирует форму.
   */
  validate() {
    // Изначально считаем что валидация успешна, если кто-то провалит, то поставим false.
    let isValid = true;
    // Перебираем все правила.
    for (let rule of this.rules) {
      // Получаем элемент, который проверяем.
      const inputEl = document.querySelector(rule.selector);
      // Перебираем все методы, по которым надо провалидировать поле.
      for (let method of rule.methods) {
        // Получаем ошибку после выполнения метода.
        const errMessage = validationMethods[method.name](inputEl, method.args);
        if (errMessage) {
          // Если ошибка была, то меняем стили поля на не прошедшее валидацию.
          this.setInvalidField(inputEl, errMessage);
          // Ставим флаг что валидация провалилась в форме.
          isValid = false;
          // Больше не нужно проверять поле, если одну ошибку у поля уже получили.
          break;
        } else {
          // Если сообщения об ошибке не было, значит валидация пройдена.
          this.setValidField(inputEl);
        }
      }
    }

    // Возвращаем общий результат формы, была пройдена валидация всеми или нет.
    return isValid;
  },

  /**
   * Устанавливает класс провала валидации инпуту и ставит сообщение о том, почему валидация провалена.
   * @param {Element} inputEl Элемент инпута, который провалил валидацию.
   * @param {string} message Сообщение об ошибке.
   */
  setInvalidField(inputEl, message) {
    // Ставим is-invalid класс и убираем is-valid у инпута.
    const cl = inputEl.classList;
    cl.remove('is-valid');
    cl.add('is-invalid');

    // Если не стояло уже сообщения об ошибке, то создаем и вставляем переданное сообщение как текст.
    let hintWrap = inputEl.parentNode.querySelector('.invalid-feedback');
    if (!hintWrap) {
      hintWrap = document.createElement('div');
      hintWrap.classList.add('invalid-feedback');
      inputEl.parentNode.appendChild(hintWrap);
    }

    hintWrap.textContent = message;
  },

  /**
   * Устанавливает класс прохождения валидации инпуту и убирает сообщение о провале валидации, если такое было.
   * @param {Element} inputEl
   */
  setValidField(inputEl) {
    // Ставим is-valid класс и убираем is-invalid у инпута.
    const cl = inputEl.classList;
    cl.remove('is-invalid');
    cl.add('is-valid');
  },
};

// Инициализируем форму.
form.init();