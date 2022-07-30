/** Модуль "Слайдер" **/

import { PRICE_LIST as priceList } from './form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const houseType = document.querySelector('#type');
const price = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    'min': 0,
    'max': 100000,
  },
  start: Number(price.placeholder),
  step: 100,
  behaviour: 'drag',
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  price.value = sliderElement.noUiSlider.get();
});

houseType.addEventListener('change', (evt) => {
  const currentValue = evt.target.value;
  const newStartValue = Number(priceList[currentValue]);
  sliderElement.noUiSlider.set(newStartValue);
});

price.addEventListener('input', (evt) => {
  const newStartValue = evt.target.value;
  sliderElement.noUiSlider.set(newStartValue);
});

const disableSlider = () => sliderElement.setAttribute('disabled', 'true');
const activateSlider = () => sliderElement.removeAttribute('disabled');
const resetSlider = () => sliderElement.noUiSlider.set(0);

export {activateSlider, disableSlider, resetSlider};
