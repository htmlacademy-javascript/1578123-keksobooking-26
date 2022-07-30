/** Модуль взаимодействия с сервером **/

const urls = {
  LOAD: 'https://26.javascript.pages.academy/keksobooking/data', // url для получения данных с сервера
  UPLOAD: 'https://26.javascript.pages.academy/keksobooking' // url для отправки данных из формы на сервер
};

// Функция получения данных с сервера
const getData = async (onSuccess, onError) => {
  try {
    const response = await fetch(urls.LOAD);

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const json = await response.json();
    onSuccess(json);
  } catch (e) {
    onError(`Ошибка загрузки данных ${e}`);
  }
};

// Функция отправки формы на сервер
const sendData = async (onSuccess, onError, body) => {
  try {
    const response = await fetch(urls.UPLOAD, {method: 'POST', body});

    if (response.ok) {
      onSuccess('Объявление успешно опубликовано!');
    } else if (response.status >= 500 && response.status <= 505) {
      onError('Не удалось получить данные с сервера. Попробуйте ещё раз!');
    } else {
      onError('Не удалось отправить форму! Повторите попытку!');
    }
  } catch (e) {
    onError('Не удалось отправить форму! Повторите попытку!');
  }
};

export {getData, sendData};
