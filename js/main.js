/* Вспомогательные функции для проекта */

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
const getRandomFloat = (min, max, num) => {
  min = Math.abs(min);
  max = Math.abs(max);

  if (!min || !max) {
    return 'Ошибка! Не переданы один или несколько аргументов функции!';
  }

  // Если не указано количество знаков после запятой, берём по умолчанию 2 знака
  if (!num) {
    num = 2;
  }

  const rand = min > max ? max + Math.random() * (min - max) :
    min + Math.random() * (max - min);

  return parseFloat(rand).toFixed(num);
};

getRandomInteger(0, 5);
getRandomFloat(3, 7, 5);
