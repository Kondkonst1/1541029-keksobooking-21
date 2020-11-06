'use strict';
(
  function () {
    const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
    const offerTypeMap = {
      'flat': "Квартира",
      'bungalow': "Бунгало",
      'house': "Дом",
      'palace': "Дворец",
    };
    const fillCard = (pin) => {
      let mapCard = cardTemplate.cloneNode(true);
      mapCard.querySelector('.popup__title').textContent = pin.offer.title;
      mapCard.querySelector('.popup__text--address').textContent = pin.offer.address;
      mapCard.querySelector('.popup__text--price ').textContent = `${pin.offer.price}₽/ночь`;
      mapCard.querySelector('.popup__type').textContent = offerTypeMap[(pin.offer.type)];
      mapCard.querySelector('.popup__text--capacity').textContent = `${pin.offer.rooms}комнаты для ${pin.offer.guests} гостей`;
      mapCard.querySelector('.popup__text--time').textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;

      const arrayFeatures = mapCard.querySelector('.popup__features');
      arrayFeatures.innerHTML = '';
      for (let ftr = 0; ftr < pin.offer.features.length; ftr++) {
        const oneFeatures = document.createElement('li');
        oneFeatures.classList.add('popup__feature');
        oneFeatures.classList.add('popup__feature--' + pin.offer.features[ftr]);
        arrayFeatures.appendChild(oneFeatures);
      }

      mapCard.querySelector('.popup__description').textContent = pin.offer.description;
      mapCard.querySelector('.popup__avatar').textContent = pin.author.avatar;

      const allPhotos = mapCard.querySelector('.popup__photos');
      if (pin.offer.photos.length > 0) {
        const cardPhotos = mapCard.querySelector('.popup__photo');
        cardPhotos.src = pin.offer.photos[0];

        for (let photo = 1; photo < pin.offer.photos.length; photo++) {
          let newPhoto = cardPhotos.cloneNode(true);
          newPhoto.src = pin.offer.photos[photo];
          allPhotos.append(newPhoto);
        }
      } else {
        allPhotos.remove();
      }

      return mapCard;
    };


    const createCard = () => {
      const mapCardFragment = document.createDocumentFragment();
      mapCardFragment.appendChild(fillCard(window.data.adsArray[0]));
      let before = document.querySelector('.map__filters-container');
      window.map.element.insertBefore(mapCardFragment, before);
    };

  //  createCard();
  })();
