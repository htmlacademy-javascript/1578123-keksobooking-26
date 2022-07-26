/** Модуль "Фильтры" **/

import { createMarker, clearMarker } from './map.js';

const OFFERS_COUNT = 10;
const INIT_VALUE = 'any';

const mapFilters = document.querySelector('.map__filters');

const priceMapFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const mapFiltersList = mapFilters.children;
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');

// Активное состояние фильтра для карты
const activateMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');

  for (const filterItem of mapFiltersList) {
    filterItem.removeAttribute('disabled');
  }
};

const checkFeatures = (el) => Array.from(featuresFilter).every((featureFilter) => {
  if (!featureFilter.checked) {
    return true;
  }
  if (!el.offer.features) {
    return false;
  }
  return el.offer.features.includes(featureFilter.value);
});

const checkType = (el) => typeFilter.value === el.offer.type || typeFilter.value === INIT_VALUE;
const checkPrice = (el) => priceFilter.value === INIT_VALUE || (el.offer.price >= priceMapFilter[priceFilter.value].start && el.offer.price <= priceMapFilter[priceFilter.value].end);
const checkRooms = (el) => el.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === INIT_VALUE;
const checkGuests = (el) => el.offer.guests === Number(guestsFilter.value) || guestsFilter.value === INIT_VALUE;

// Функция проверки всех фильтров
const checkAllFilters = (data)  => {
  const filteredData = [];
  for (let i = 0; i < data.length; i++) {
    const elem = data[i];
    if (checkType(elem) && checkPrice(elem) && checkRooms(elem) && checkGuests(elem) && checkFeatures(elem)) {
      createMarker(elem);
      filteredData.push(elem);
    }

    if (filteredData.length === OFFERS_COUNT) {
      break;
    }
  }

  return filteredData;
};

// Функция изменения фильтра
const changeFilters = (cb) => {
  mapFilters.addEventListener('change', () => {
    clearMarker();
    cb();
  });
};

export {mapFilters, mapFiltersList, activateMapFilters, checkAllFilters, changeFilters};


