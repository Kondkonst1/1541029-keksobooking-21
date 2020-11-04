'use strict';
(
  function () {
    const MAP_PIN_WIDTH = 50;
    const MAP_PIN_HEIGHT = 70;
    const mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    const mapPins = window.map.map.querySelector('.map__pins');

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
      for (let i = 0; i < window.data.adsArray.length; i++) {
        mapPinFragment.appendChild(createMapPin(window.data.adsArray[i]));
      }
      mapPins.appendChild(mapPinFragment);
    };
    // renderPins();
  })();
