/** Модуль "Карта" **/
import { adForm, address, MAIN_PIN_COORDINATES, setPageToActive } from './form.js';
import { setCoordinates } from './util.js';
import { offers, randomCards } from './offers.js';
import { activateSlider } from './slider.js';

// Масштаб (зум)
const MAP_ZOOM = 12;

// Главная иконка на карте
const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52]
});

// Карта
const map = L.map('map-canvas');

// Функция отрисовки карты
const renderMap = () => {
  map.on('load', () => {
    setPageToActive();
    activateSlider();
    setCoordinates(address, MAIN_PIN_COORDINATES);
  }).setView(MAIN_PIN_COORDINATES, MAP_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
};

// Расположение основной метки
const mainPinMarker = L.marker(MAIN_PIN_COORDINATES, { draggable: true, icon: MAIN_PIN_ICON });
mainPinMarker.addTo(map);

// Определение координат при изменении координат метки
const mainPinMarkerCoordinates = () => mainPinMarker.on('move', (evt) => {
  const coordinates = evt.target.getLatLng();
  setCoordinates(address, coordinates);
});

// Отрисовка "обычных" меток
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Создадим отдельный слой на карте для меток
const markerGroup = L.layerGroup().addTo(map);

// Функция создания метки
const createMarker = (point, index) => {
  const { lat, lng } = point;
  const marker = L.marker({lat, lng}, {icon});
  marker.addTo(markerGroup).bindPopup(randomCards[index], {keepInView: true, closeOnEscapeKey: true});
};

// Рендерим балуны
offers.forEach(({location}, index) => createMarker(location, index));

// Функция возврата страницы к начальному состоянию (сброс)
const resetPage = () => {
  mainPinMarker.setLatLng(MAIN_PIN_COORDINATES);
  map.setView(MAIN_PIN_COORDINATES, MAP_ZOOM);
  adForm.reset();
  setCoordinates(address, mainPinMarker.getLatLng());
};

export {renderMap, mainPinMarkerCoordinates, resetPage};

