/*** Модуль "Данные" ***/

import {getRandomArrayElement, getRandomInteger, getRandomFloat, getUniqueArrayValues, numberFormat} from './util.js';

const ROOM_TITLES = ['Luxury Lake', 'CappaCale Dale', 'Cassa mist', 'Sunset Treasury', 'White Cascade', 'GoldenFeet', 'Ocean Shores', 'The Corner of Main', 'Tropicana', 'Pearl apartments'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const ROOM_DESCRIPTIONS = ['Our guest rooms are beautifully designed with many unique features', 'All of our King rooms offer king size beds, flat screen tv’s, tiled shower-bath tub combination, a refrigerator and coffee station', 'Our rooms offer the same luxurious amenities as our King rooms with the addition of cozy gas fireplaces', 'French doors leading out to either a balcony or veranda', 'These rooms include two queen size beds, flat screen tv, tiled shower-bath tub combination, a refrigerator, and coffee station'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createObj = () => {
  const resObj = {
    author: {
      avatar: `img/avatars/user${numberFormat(getRandomInteger(1, 10), 2)}.png`
    },
    offer: {
      title: getRandomArrayElement(ROOM_TITLES),
      address: '',
      price: getRandomInteger(20, 2000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 200),
      checkin: getRandomArrayElement(HOURS),
      checkout: getRandomArrayElement(HOURS),
      features: getUniqueArrayValues(FEATURES, getRandomInteger(1, FEATURES.length)),
      description: getRandomArrayElement(ROOM_DESCRIPTIONS),
      photos: getRandomArrayElement(PHOTOS)
    },
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5)
    }
  };

  resObj.offer.address = `${resObj.location.lat} ${resObj.location.lng}`;

  return resObj;
};

const similarObjects = Array.from({length: 10}, createObj);

export {similarObjects};

