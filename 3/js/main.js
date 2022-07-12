/* Вспомогательные функции для проекта */

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

isInt(5);
isFloat(1.24);
getRandomInteger(0, 5);
getRandomFloat(3, 7, 5);

/** Задание 9 **/
const ROOM_TITLES = ['Luxury Lake', 'CappaCale Dale', 'Cassa mist', 'Sunset Treasury', 'White Cascade', 'GoldenFeet', 'Ocean Shores', 'The Corner of Main', 'Tropicana', 'Pearl apartments'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOM_DESCRIPTIONS = ['Our guest rooms are beautifully designed with many unique features', 'All of our King rooms offer king size beds, flat screen tv’s, tiled shower-bath tub combination, a refrigerator and coffee station', 'Our rooms offer the same luxurious amenities as our King rooms with the addition of cozy gas fireplaces', 'French doors leading out to either a balcony or veranda', 'These rooms include two queen size beds, flat screen tv, tiled shower-bath tub combination, a refrigerator, and coffee station'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// Функция получения случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

const createObj = () => {
  const resObj = {
    author: {
      avatar: `img/avatars/user${numberFormat(getRandomInteger(1, 10), 2)}.png`
    },
    offer: {
      title: getRandomArrayElement(ROOM_TITLES),
      address: '',
      price: getRandomInteger(20, 2000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 200),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: getUniqueArrayValues(FEATURES, getRandomInteger(1, FEATURES.length)),
      description: getRandomArrayElement(ROOM_DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS)
    },
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5)
    }
  };

  resObj.offer.address = `${resObj.location.lat} ${resObj.location.lng}`;

  return resObj;
};

const similarObjects = Array.from({length: 10}, createObj);
