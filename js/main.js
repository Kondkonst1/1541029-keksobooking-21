'use strict';
const MAX_COUNT = 8;
const MAX_LOCATION = 1000;
const adsArray = [];
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;
const Y_LOCATION_MIN = 130;
const Y_LOCATION_MAX = 630;
const X_LOCATION_MIN = 1;

const map = document.querySelector('.map');

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const shuffleArray = (array) => {
  var i;
  var j;
  var x;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};
const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const types = ['palace', 'flat', 'house', 'bungalow'];
const checkInOut = ['12.00', '13.00', '14.00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const getAds = () => {
  for (let i = 0; i < MAX_COUNT; i++) {
    adsArray.push(
        {
          "author": {
            "avatar": `img/avatars/user0${i + 1}.png`,
          },
          "offer": {
            "title": `Квартира`,
            "address": getRandom(1, MAX_LOCATION) + `,` + getRandom(1, MAX_LOCATION),
            "price": getRandom(10000, 100000),
            "type": types[getRandom(0, types.length - 1)],
            "rooms": getRandom(1, 5),
            "guests": getRandom(1, 5),
            "checkin": checkInOut[getRandom(0, 2)],
            "checkout": checkInOut[getRandom(0, 2)],
            "features": shuffleArray(features).slice(0, getRandom(0, features.length)),
            "description": 'Описание',
            "photos": shuffleArray(photos).slice(0, getRandom(0, photos.length)),
          },
          "location": {
            "x": getRandom(X_LOCATION_MIN, map.offsetWidth),
            "y": getRandom(Y_LOCATION_MIN, Y_LOCATION_MAX),
          },
        });
  }
};

getAds();

const mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const mapPins = map.querySelector('.map__pins');

const createMapPin = (pin) => {
  let mapPin = mapPinTemplate.cloneNode(true);
  let img = mapPin.querySelector('img');
  mapPin.style.left = `${pin.location.x - MAP_PIN_WIDTH / 2}px`;
  mapPin.style.top = `${pin.location.y - MAP_PIN_HEIGHT}px`;
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;
  return mapPin;
};

const renderPins = () => {
  const mapPinFragment = document.createDocumentFragment();
  for (let i = 0; i < adsArray.length; i++) {
    mapPinFragment.appendChild(createMapPin(adsArray[i]));
  }
  mapPins.appendChild(mapPinFragment);
};
renderPins();
map.classList.remove('map--faded');

const offerTypeMap = {
  'flat': "Квартира",
  'bungalow': "Бунгало",
  'house': "Дом",
  'palace': "Дворец",
};
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const fillCard = () => {
  let mapCard = cardTemplate.cloneNode(true);
  mapCard.querySelector('.popup__title').textContent = adsArray[0].offer.title;
  mapCard.querySelector('.popup__text--address').textContent = adsArray[0].offer.address;
  mapCard.querySelector('.popup__text--price ').textContent = `${adsArray[0].offer.price}₽/ночь`;
  mapCard.querySelector('.popup__type').textContent = offerTypeMap[(adsArray[0].offer.type)];
  mapCard.querySelector('.popup__text--capacity').textContent = `${adsArray[0].offer.rooms}комнаты для ${adsArray[0].offer.guests} гостей`;
  mapCard.querySelector('.popup__text--time').textContent = `Заезд после ${adsArray[0].offer.checkin}, выезд до ${adsArray[0].offer.checkout}`;
  mapCard.querySelector('.popup__features').textContent = adsArray[0].features;
  mapCard.querySelector('.popup__description').textContent = adsArray[0].description;
  mapCard.querySelector('.popup__avatar').textContent = adsArray[0].author.avatar;

  const allPhotos = mapCard.querySelector('.popup__photos');
  const cardPhotos = mapCard.querySelector('.popup__photo');

  for (let photo of photos) {
    cardPhotos.src = photo;
    allPhotos.insertAdjacentElement('beforeEnd', cardPhotos);
  }
  return mapCard;
};


const createCard = () => {
  const mapCardFragment = document.createDocumentFragment();
  mapCardFragment.appendChild(fillCard());
  let before = document.querySelector('.map__filters-container');
  map.insertBefore(mapCardFragment, before);
};
createCard();
