/** Модуль "Формы" **/
import { setDisabledState, setCoordinates, getAvatar, getPhoto, renderPhoto } from './util.js';
import { resetPage } from './map.js';
import { sendData } from './api.js';
import { mapFiltersList } from './filter.js';
import { showModalSuccess, showModalError } from './popup.js';

// Координаты главной метки (по умолчанию)
const MAIN_PIN_COORDINATES = {
  lat: 35.69034,
  lng: 139.75175
};

const adForm = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');

const disabledFields = adForm.querySelectorAll('select.map__filter', 'fieldset');
const resetForm = adForm.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');

const timeSection = adForm.querySelector('.ad-form__element--time');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const houseType = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const guestNumber = capacity.querySelectorAll('option');

const formAvatar = document.querySelector('.ad-form-header__preview');
const formPhoto = document.querySelector('.ad-form__photo');

const avatarPreview = formAvatar.querySelector('img').cloneNode(true);

const avatarLoader = adForm.querySelector('#avatar');
const photoLoader = adForm.querySelector('#images');

// Синхронизации полей «Время заезда» и «Время выезда»
const onTimeChange = (evt) => {
  timeIn.value = evt.target.value;
  timeOut.value = evt.target.value;
};

timeSection.addEventListener('change', (evt) => onTimeChange(evt));

// Pristine validation
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

const validatePrice = (value) => {
  const MAX_PRICE = 100000;
  return value.length && Number(value) >= Number(price.placeholder) && Number(value) <= MAX_PRICE;
};

const getPriceErrorMessage = () => `Число в диапазоне от ${price.placeholder} до 100000`;

pristine.addValidator(adForm.querySelector('#title'), validateTitle, 'Поле иметь значение в диапазоне от 30 до 100 символов');
pristine.addValidator(price, validatePrice, getPriceErrorMessage);

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }

  pristine.validate();
});

// Синхронизации полей «Тип жилья» и «Цена за ночь»
const priceList = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const validatePrices = () => {
  price.placeholder = priceList[houseType.value];
  price.min = priceList[houseType.value];
};

validatePrices();

const onHouseTypeChange = () => {
  validatePrices();
};

houseType.addEventListener('change', onHouseTypeChange);

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

roomNumber.addEventListener('change', onRoomNumberChange);

const getAvatarPreview = () => renderPhoto(avatarLoader, getAvatar);
const getPhotoPreview = () => renderPhoto(photoLoader, getPhoto);

getAvatarPreview();
getPhotoPreview();


// Функция перевода страницы в активное состояние
const setPageToActive = () => {
  adForm.classList.remove('ad-form--disabled');
  formFilters.classList.remove('map__filters--disabled');

  setDisabledState(disabledFields);
  setCoordinates(address, {lat: 0, lng: 0}, 5);
};

// Функция перевода страницы в неактивное состояние
const setPageToUnactive = () => {
  adForm.classList.add('ad-form--disabled');
  formFilters.classList.add('map__filters--disabled');

  setDisabledState(disabledFields);

  for (const filterItem of mapFiltersList) {
    filterItem.setAttribute('disabled', true);
  }

  setCoordinates(address, {lat: 0, lng: 0}, 5);
};

const submitForm = (cb) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(() => {
      showModalSuccess();
      resetPage();
      cb();
    }, showModalError, formData);
  });
};

// Обработчик кнопки сброса (reset)
const onResetButtonClick = (cb) => {
  resetForm.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetPage();
    cb();
  });
};

export {
  setPageToActive,
  setPageToUnactive,
  onResetButtonClick,
  onHouseTypeChange,
  submitForm,
  adForm,
  houseType,
  priceList,
  price,
  MAIN_PIN_COORDINATES,
  address,
  formPhoto,
  avatarPreview
};
