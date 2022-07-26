/*** Модуль "Объявления" ***/
import { similarObjects as createSimilarObjects} from './data.js';
import { getRandomInteger } from './util.js';

const mapCanvas = document.querySelector('#map-canvas');
const offersTemplate = document.querySelector('#card').content.querySelector('.popup');

const offers = createSimilarObjects;

// Функция заполнения объявления данными
const fillCards = (node, classItem, data) => {
  const { author, offer } = data;

  const truncatedClass = (classItem.indexOf('text') > 0) ? classItem.replace('.popup__text--', '') : classItem.replace('.popup__', '');

  if (Object.keys(offer).includes(truncatedClass)) {
    // Если значение в offer[TYPE] пустое, то скрываем узел
    if (!offer[truncatedClass]) {
      node.querySelector(classItem).remove();
      return;
    }

    switch (truncatedClass) {
      case 'price':
        node.querySelector(classItem).textContent = `${offer[truncatedClass]} ₽/ночь`;
        break;

      case 'features': {
        const featuresContainer = node.querySelector(classItem);
        const featuresList = featuresContainer.querySelectorAll('.popup__feature');
        const objectFeatures = offer[truncatedClass];

        featuresList.forEach((featureListItem) => {
          const isFound = objectFeatures.some((objectFeature) => featureListItem.classList.contains(`popup__feature--${  objectFeature}`));

          if (!isFound) {
            featureListItem.remove();
          }
        });
        break;
      }

      case 'avatar':
        node.querySelector(classItem).src = author[truncatedClass];
        break;

      case 'photos': {
        const photosContainer = node.querySelector(classItem);
        const photoTemplate = photosContainer.querySelector('.popup__photo');
        photoTemplate.src = offer[truncatedClass];
        break;
      }

      default:
        node.querySelector(classItem).textContent = offer[truncatedClass];
    }
  } else {
    switch (truncatedClass) {
      case 'capacity':
        node.querySelector(classItem).textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
        break;
      case 'time':
        node.querySelector(classItem).textContent =`Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
        break;
    }
  }
};

// Функция отрисовки карточки с объявлением
const renderCard = (template, data) => {
  const CLASSES = ['.popup__title', '.popup__text--address', '.popup__text--price', '.popup__type', '.popup__text--capacity', '.popup__text--time', '.popup__features', '.popup__description', '.popup__photos'];

  // Клонируем элемент из шаблона
  const offerElement = template.cloneNode(true);
  CLASSES.forEach((currentClass) => fillCards(offerElement, currentClass, data));

  return offerElement;
};

const randomCards = [];

for (let i = 0; i < offers.length; i++) {
  const card = renderCard(offersTemplate, offers[i]);
  randomCards.push(card);
}

//mapCanvas.append(randomCard);

export {renderCard, offers, randomCards};

