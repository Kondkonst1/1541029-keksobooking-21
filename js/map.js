'use strict';
(function () {
  const map = document.querySelector('.map');
  const MAIN_PIN_MIN_Y = 130;
  const MAIN_PIN_MAX_Y = 630;
  const MAIN_PIN_OFFSET_X = 62;
  const MAIN_PIN_OFFSET_Y = 62;

  const mainPin = map.querySelector('.map__pin--main');

  // Получаем координаты главной геометки
  const getMainPinCoords = () => {
    const coords = {
      x: mainPin.offsetLeft,
      y: mainPin.offsetTop + MAIN_PIN_OFFSET_Y
    };
    return coords;
  };
  const mainPinInitialCoords = getMainPinCoords();

  // Устанавливаем главной метке изначальные координаты
  const resetMap = () => {
    mainPin.style.top = mainPinInitialCoords.y - MAIN_PIN_OFFSET_Y + 'px';
    mainPin.style.left = mainPinInitialCoords.x + 'px';
  };
  // Проверяем не заходит ли геометка за рамки
  const checkCoords = (coords) => {
    const minX = MAIN_PIN_OFFSET_X;
    const maxX = document.querySelector('.map').offsetWidth - MAIN_PIN_OFFSET_X;
    const minY = MAIN_PIN_MIN_Y - MAIN_PIN_OFFSET_Y;
    const maxY = MAIN_PIN_MAX_Y - MAIN_PIN_OFFSET_Y;

    if (coords.x < minX) {
      coords.x = minX;
    }

    if (coords.x > maxX) {
      coords.x = maxX;
    }

    if (coords.y < minY) {
      coords.y = minY;
    }

    if (coords.y > maxY) {
      coords.y = maxY;
    }

    return coords;
  };

  // перемещение для главной геометки
  const onMainPinMouseDown = (evt) => {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      // Проверяем не заходит ли геометка за рамки
      newCoords = checkCoords(newCoords);
      mainPin.style.top = (newCoords.y) + 'px';
      mainPin.style.left = (newCoords.x) + 'px';
    };

    const onMouseUp = () => {
      window.form.setAddress(getMainPinCoords());
      // Отключаем слушатели
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  // Слушатели
  mainPin.addEventListener('mousedown', onMainPinMouseDown);

  window.map = {
    element: map,
    mainPin: mainPin,
    mainPinInitialCoords: mainPinInitialCoords,
    reset: resetMap
  };
})();
