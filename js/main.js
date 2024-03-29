/*** Модуль "Точка входа" (Основной) ***/

import { renderMap, mainPinMarkerCoordinates } from './map.js';
import { disableSlider } from './slider.js';
import { setPageToUnactive, onResetFormClick, submitForm } from './form.js';
import { getData } from './api.js';
import { activateMapFilters, checkAllFilters, changeFilters } from './filter.js';
import { debounce } from './util.js';
import { showModalError } from './popup.js';

// Задержка ("устранение дребезга")
const DELAY_TIME = 500;

setPageToUnactive();
disableSlider();
renderMap();
mainPinMarkerCoordinates();

getData((offers) => {
  checkAllFilters(offers);
  changeFilters(debounce(() => checkAllFilters(offers), DELAY_TIME));
  activateMapFilters(); // При успешной загрузке карты фильтр для карты переключается в активное состояние
  submitForm(() => checkAllFilters(offers));
  onResetFormClick(() => checkAllFilters(offers));
}, showModalError);


