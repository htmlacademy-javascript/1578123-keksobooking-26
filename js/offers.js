/*** Модуль "Объявления" ***/

const HOUSE_TYPES = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'hotel': 'Отель',
  'house': 'Дом',
  'palace': 'Дворец'
};

// Шаблон для функции renderCard
const offersTemplate = document.querySelector('#card').content.querySelector('.popup');

// Функция склонения окончаний для комнат
const declineRoomsTitle = (count) => {
  switch (count) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

// Функция склонения окончаний для гостей
const declineGuestsTitle = (count) => {
  if (count === 0) {
    return 'не для гостей';
  }
  if (count > 1) {
    return `для ${count} гостей`;
  }
  return `для ${count} гостя`;
};

// Функция генерации удобств
const createFeatures = (features) => {
  const fragment = document.createDocumentFragment();
  features.forEach((item) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${item}`);
    fragment.append(feature);
  });

  return fragment;
};

// Функция генерации фотографий
const createPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = photo;
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    fragment.append(newPhoto);
  });

  return fragment;
};

// Функция клонирует и заполняет шаблон cardTemplate
const renderCard = ({ author, offer }) => {
  const card = offersTemplate.cloneNode(true);
  const features = card.querySelector('.popup__features');
  const photos = card.querySelector('.popup__photos');

  card.querySelector('.popup__avatar').src = author.avatar || '';
  card.querySelector('.popup__title').textContent = offer.title || '';
  card.querySelector('.popup__text--address').textContent = offer.address || '';
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` || '';
  card.querySelector('.popup__type').textContent = HOUSE_TYPES[offer.type] || '';
  card.querySelector('.popup__text--capacity').textContent = (!offer.rooms || !Number.isInteger(offer.guests)) ? '' : `${offer.rooms} ${declineRoomsTitle(offer.rooms)} ${declineGuestsTitle(offer.guests)}`;
  card.querySelector('.popup__text--time').textContent = (!offer.checkin || !offer.checkout) ? '' : `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  features.innerHTML = '';

  if (offer.features) {
    const newFeatureElements = createFeatures(offer.features);
    features.append(newFeatureElements);
  } else {
    features.remove();
  }

  card.querySelector('.popup__description').textContent = offer.description || '';

  photos.innerHTML = '';
  if (offer.photos) {
    const newPhotoElements = createPhotos(offer.photos);
    photos.append(newPhotoElements);
  } else {
    photos.remove();
  }

  return card;
};

export {renderCard};

