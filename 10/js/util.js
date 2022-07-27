/*** Модуль "Вспомогательные функции для проекта" ***/

// Функция проверки на целое число
const isInt = (num) => Number(num) === num && num % 1 === 0;

// Функция проверки на число с плавающей точкой
const isFloat = (num) => Number(num) === num && num % 1 !== 0;

// Функция генерации случайных целых чисел в переданном диапазоне
const getRandomInteger = (min, max) => {
  min = Math.abs(Math.ceil(Number(min)));
  max = Math.abs(Math.floor(Number(max)));

  if (!min || !max) {
    return 'Ошибка! Не переданы один или несколько аргументов функции!';
  }

  const result = min > max ? Math.floor(Math.random() * (min - max + 1)) + max : Math.floor(Math.random() * (max - min + 1)) + min;

  return result;
};

// Функция генерации случайных целых чисел с плавающей точков (с указанным количеством знаков после запятой) в переданном диапазоне
const getRandomFloat = (min, max, precision) => {
  min = Math.abs(Number(min));
  max = Math.abs(Number(max));

  if (!min || !max) {
    return 'Один из аргументов отсутствует, либо содержит некорректный тип данных!';
  }

  // Если не указано количество знаков после запятой, берём по умолчанию 2 знака
  if (!precision) {
    precision = 2;
  }

  let result = Math.round(Math.random() * Math.pow(10, precision)) / Math.pow(10, precision) * (max - min) + min;

  if (min > max) {
    result = Math.round(Math.random() * Math.pow(10, precision)) / Math.pow(10, precision) * (min - max) + max;
  }

  return parseFloat(result.toFixed(precision));
};

// Функция получения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(1, elements.length - 1)];

// Функция получения указанного количества уникальных элементов из массива
const getUniqueArrayValues = (array, num = array.length) => {
  if (num > array.length) {
    num = array.length;
  }

  const outArray = [];

  for (let i = 0; i < num; i++) {
    if (outArray.indexOf(array[i]) === -1) {
      outArray.push(array[i]);
    }
  }

  return outArray;
};

// Функция добавления нулей перед числами до 10
const numberFormat = (num, width) => new Array(+width + 1 - (String(num)).length).join('0') + num;

// Функция преобразования названий типов-аппартаментов на русские
const translateOfferTypeToRus = (type) => {
  const EQUIVALENTS = {
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
    'hotel': 'Отель'
  };

  if (!type) {
    return;
  }

  return EQUIVALENTS[type];
};

// Функция добавления атрибута disabled для узла
const setDisabledState = (fields) => {
  fields.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

// Сеттер координат
const setCoordinates = (target, coordinates, precision) => {
  if (!precision) {
    precision = 5;
  }

  target.value = `${Number(coordinates.lat).toFixed(precision)}, ${Number(coordinates.lng).toFixed(precision)}`;
};

// Функция создания аватара
const getAvatar = (node, form, url) => {
  const fragment = document.createDocumentFragment();
  node.src = url;
  fragment.append(node);
  form.innerHTML = '';
  form.append(fragment);
};

// Функция создания фотографии жилья
const getPhoto = (form, url) => {
  const WIDTH = 70;
  const HEIGHT = 70;

  form.innerHTML = '';
  const fragment = document.createDocumentFragment();
  const element = document.createElement('img');

  element.src = url;
  element.alt = 'Фото жилья';
  element.width = WIDTH;
  element.height = HEIGHT;

  fragment.append(element);
  form.append(fragment);
};

// Функция отрисовки фотографии
const renderPhoto = (chooseFile, cb) => {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  chooseFile.addEventListener('change', () => {
    const file = chooseFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const result = reader.result;
        cb(result);
      });

      reader.readAsDataURL(file);
    }
  });
};

// debounce
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isInt,
  isFloat,
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getUniqueArrayValues,
  numberFormat,
  translateOfferTypeToRus,
  setDisabledState,
  setCoordinates,
  getAvatar,
  getPhoto,
  renderPhoto,
  debounce
};
