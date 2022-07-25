/** Модуль "Формы" **/
import { setDisabledState } from './util.js';

const adForm = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const disabledFields = document.querySelectorAll('select.map__filter', 'fieldset');
const address = document.querySelector('#address');

// Устанавливаем адресу атрибут "readonly"
address.setAttribute('readonly', true);

const timeSection = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const houseType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');

// Синхронизации полей «Время заезда» и «Время выезда»
const onTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

timeSection.addEventListener('change', (evt) => onTimeChange(evt));

// Синхронизации полей «Тип жилья» и «Цена за ночь»
const pricesList = {
  'bungalow': ['0', 'Бунгало'],
  'flat': ['1000', 'Квартира'],
  'hotel': ['3000', 'Отель'],
  'house': ['5000', 'Дом'],
  'palace': ['10000', 'Дворец']
};

const validatePrices = () => {
  const houseValue = houseType.value;
  price.placeholder = pricesList[houseValue][0];
  price.min = pricesList[houseValue][0];
};

validatePrices();

const onHouseTypeChange = () => {
  validatePrices();
};

houseType.addEventListener('change', () => onHouseTypeChange());

// Сценарий проверки соответствия количества спальных мест количеству комнат
const guestsCount = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const validateRooms = () => {
  const roomValue = roomNumber.value;

  guestNumber.forEach((guest) => {
    const isDisabled = (!guestsCount[roomValue].includes(guest.value));
    guest.selected = guestsCount[roomValue][0] === guest.value;
    guest.disabled = isDisabled;
    guest.hidden = isDisabled;
  });
};

// Отрезаем ненужные элементы при запуске страницы
validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumber.addEventListener('change', () => onRoomNumberChange());

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
