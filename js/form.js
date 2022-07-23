/** Модуль "Формы" **/

const adForm = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('select.map__filter', 'fieldset');
const address = document.querySelector('#address');

// Устанавливаем адресу атрибут "readonly"
address.setAttribute('readonly', true);

// Функция добавления атрибута disabled для узла
const setDisabledState = (fields) => {
  fields.forEach((element) => {
    element.disabled = !element.disabled;
  });
};

// Функция перевода страницы в активное состояние
const setPageToActive = () => {
  adForm.classList.remove('ad-form--disabled');
  formFilters.classList.remove('map__filters--disabled');

  setDisabledState(disabledFields);
  address.value = '0, 0';
};

// Функция перевода страницы в неактивное состояние
const setPageToUnactive = () => {
  adForm.classList.add('ad-form--disabled');
  formFilters.classList.add('map__filters--disabled');

  setDisabledState(disabledFields);

  address.value = '0, 0';
};

setPageToUnactive();
setPageToActive();

export {setPageToActive, setPageToUnactive};
