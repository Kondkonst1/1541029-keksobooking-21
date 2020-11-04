'use strict';
(function () {

  const MAX_COUNT = 8;
  const MAX_LOCATION = 1000;
  const adsArray = [];
  const Y_LOCATION_MIN = 130;
  const Y_LOCATION_MAX = 630;
  const X_LOCATION_MIN = 1;

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
              "description": `Описание чудесного дома`,
              "photos": shuffleArray(photos).slice(0, getRandom(0, photos.length)),
            },
            "location": {
              "x": getRandom(X_LOCATION_MIN, window.map.map.offsetWidth),
              "y": getRandom(Y_LOCATION_MIN, Y_LOCATION_MAX),
            },
          });
    }
  };
  getAds();
  window.data = {
    adsArray: adsArray
  };

})();
