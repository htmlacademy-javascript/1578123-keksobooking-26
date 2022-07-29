/** Модуль "Фильтры" **/

import { createMarker, clearMarker } from './map.js';
import { MAP_FILTERS_DISABLED } from './form.js';

const OFFERS_COUNT = 10;
const INIT_VALUE = 'any';

const PRICE_MAP_FILTER = {
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

const mapFilters = document.querySelector('.map__filters');
const mapFiltersList = mapFilters.children;
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');

// Активное состояние фильтра для карты
const activateMapFilters = () => {
  mapFilters.classList.remove(MAP_FILTERS_DISABLED);

  for (const filterItem of mapFiltersList) {
    filterItem.disabled = false;
  }
};

// Функция проверки фильтра удобств
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
const checkPrice = (el) => priceFilter.value === INIT_VALUE || (el.offer.price >= PRICE_MAP_FILTER[priceFilter.value].start && el.offer.price <= PRICE_MAP_FILTER[priceFilter.value].end);
const checkRooms = (el) => el.offer.rooms === Number(roomsFilter.value) || roomsFilter.value === INIT_VALUE;
const checkGuests = (el) => el.offer.guests === Number(guestsFilter.value) || guestsFilter.value === INIT_VALUE;

// Функция проверки всех фильтров
const checkAllFilters = (data)  => {
  const filteredData = [];
  for (const offer of data) {
    if (checkType(offer) && checkPrice(offer) && checkRooms(offer) && checkGuests(offer) && checkFeatures(offer)) {
      createMarker(offer);
      filteredData.push(offer);
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


