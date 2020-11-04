'use strict';

(
  function () {
    const enterKey = 'Enter';
    const adForm = document.querySelector('.ad-form');
    const formsElementList = document.querySelectorAll('.ad-form__element');
    const formHeader = document.querySelector('.ad-form-header');
    const mainPin = document.querySelector('.map__pin--main');
    const topPositionPin = parseInt(mainPin.style.top, 10);
    const leftPositionPin = parseInt(mainPin.style.left, 10);
    const OFFSET_TIP = 22;

    const disableActiveMode = () => {
      window.map.map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      formHeader.setAttribute("disabled", "true");
      for (let i = 0; i < formsElementList.length; i++) {
        formsElementList[i].setAttribute("disabled", "true");
      }
    };
    disableActiveMode();

    const enableActiveMode = () => {
      window.map.map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      formHeader.setAttribute("disabled", "false");
      for (let i = 0; i < formsElementList.length; i++) {
        formsElementList[i].removeAttribute("disabled", "true");
      }
    };


    const setAddress = (offset) => {
      document.querySelector('#address').value = ` ${leftPositionPin}, ${topPositionPin + offset}`;
    };
    setAddress(0);
    mainPin.addEventListener('click', function () {
      enableActiveMode();
      setAddress(OFFSET_TIP);
    });
    mainPin.addEventListener('keydown', function (evt) {
      if (evt.key === enterKey) {
        enableActiveMode();
      }
    });

    const numberOfGuests = {
      1: ['1'],
      2: ['1', '2'],
      3: ['1', '2', '3'],
      100: ['0'],
    };


    const amountRooms = adForm.querySelector('#room_number');
    const amountPlaces = adForm.querySelector('#capacity');

    const capacityOption = amountPlaces.querySelectorAll('option');

    const validateRooms = () => {

      const roomValue = amountRooms.value;
      capacityOption.forEach(function (option) {
        let isShow = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
        // console.log(option, isShow, roomValue);
        option.selected = numberOfGuests[roomValue][0] === option.value;
        option.disabled = isShow;
        option.hidden = isShow;
      });
    };
    validateRooms();
    amountRooms.addEventListener('change', function () {
      validateRooms();
    });
  })();
