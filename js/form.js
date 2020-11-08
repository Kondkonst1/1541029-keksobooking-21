'use strict';
/* Модули часть 1 */
(
  function () {
    const LEFT_BUTTON = 0;
    const OFFSET_TIP = 22;
    const TITLE_MIN_LENGTH = 30;
    const TITLE_MAX_LENGTH = 100;
    const PRICE_MAX_VALUE = 1000000;
    const Keys = {
      ENTER: 'Enter',
      ESC: 'Escape'
    };
    const mainPin = window.map.element.querySelector('.map__pin--main');

    const positionPin = {
      topPositionPin: mainPin.offsetTop,
      leftPositionPin: mainPin.offsetLeft
    };
    const numberOfGuests = {
      1: ['1'],
      2: ['1', '2'],
      3: ['1', '2', '3'],
      100: ['0'],
    };

    const priceOneNight = {
      'bungalow': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
    };

    const adForm = document.querySelector('.ad-form');
    adForm.action = 'https://21.javascript.pages.academy/keksobooking';
    const formsElementList = document.querySelectorAll('fieldset, select');


    const fields = {
      formHeader: document.querySelector('.ad-form-header'),
      title: adForm.querySelector('#title'),
      address: adForm.querySelector('#address'),
      type: adForm.querySelector('#type'),
      price: adForm.querySelector('#price'),
      checkin: adForm.querySelector('#timein'),
      checkout: adForm.querySelector('#timeout'),
      amountRooms: adForm.querySelector('#room_number'),
      amountPlaces: adForm.querySelector('#capacity'),
    };

    const setPrice = () => {
      let price = priceOneNight[fields.type.value];
      fields.price.min = price;
      fields.price.placeholder = price;
    };
    setPrice();

    fields.type.addEventListener('change', function () {
      setPrice();
    });
    const setDisabledState = () => {
      formsElementList.forEach((item) => {
        item.disabled = !item.disabled;
      });
    };

    const disableActiveMode = () => {
      window.map.element.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      fields.formHeader.disabled = true;
      setDisabledState();
    };
    disableActiveMode();

    const enableActiveMode = () => {
      window.map.element.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      fields.formHeader.disabled = false;
      fields.title.required = true;
      fields.price.required = true;
      fields.price.max = PRICE_MAX_VALUE;
      fields.price.type = 'number';
      fields.address.readOnly = true;
      fields.title.minLength = TITLE_MIN_LENGTH;
      fields.title.maxLength = TITLE_MAX_LENGTH;
      setDisabledState();
      setPrice();
      window.pin.render(window.data.adsArray);
    };
    const setAddress = (offset) => {
      document.querySelector('#address').value = ` ${positionPin.leftPositionPin}, ${positionPin.topPositionPin + offset}`;
    };

    setAddress(0);
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === LEFT_BUTTON) {
        enableActiveMode();
        setAddress(OFFSET_TIP);
      }
    });
    mainPin.addEventListener('keydown', function (evt) {
      if (evt.key === Keys.ENTER) {
        enableActiveMode();
      }
    });

    const capacityOption = fields.amountPlaces.querySelectorAll('option');

    const validateRooms = () => {
      const roomValue = fields.amountRooms.value;
      capacityOption.forEach(function (option) {
        let isShow = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
        option.selected = numberOfGuests[roomValue][0] === option.value;
        option.disabled = isShow;
        option.hidden = isShow;
      });
    };
    validateRooms();
    fields.amountRooms.addEventListener('change', function () {
      validateRooms();
    });
    fields.checkin.addEventListener('change', function () {
      fields.checkout.value = fields.checkin.value;
    });
    fields.checkout.addEventListener('change', function () {
      fields.checkin.value = fields.checkout.value;
    });
    window.form = {
      mainPin: mainPin,
      positionPin: positionPin,
      setAddress: setAddress,
      OFFSET_TIP: OFFSET_TIP
    };
  })();
