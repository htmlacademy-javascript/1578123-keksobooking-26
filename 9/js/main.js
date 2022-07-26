/*** Модуль "Точка входа" (Основной) ***/

import { renderMap, mainPinMarkerCoordinates } from './map.js';
import { disableSlider } from './slider.js';
import './data.js';
import './offers.js';
import { setPageToUnactive } from './form.js';

// Задержка ("устранение дребезга")
//const DELAY_TIME = 500;

setPageToUnactive();
disableSlider();
renderMap();
mainPinMarkerCoordinates();

