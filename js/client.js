'use strict';

(function () {
  const TIMEOUT = 10000;
  const ERROR_TIMEOUT = 5000;
  const GET_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const POST_URL = 'https://js.dump.academy/keksobooking';
  const statusCode = {
    OK: 200,
    ERROR_REQUEST: 400,
    NOT_FOUND: 404,
    EROR_SERVER: 500,
  };

  const showErrorMessage = (message) => {
    const errorPopup = document.createElement('div');
    const errorMessageText = document.createElement('div');
    errorMessageText.textContent = message;
    errorMessageText.style.position = 'relative';
    errorMessageText.style.top = '25%';

    errorPopup.style.zIndex = '100';
    errorPopup.style.width = '400px';
    errorPopup.style.height = '80px';
    errorPopup.style.position = 'fixed';
    errorPopup.style.overflow = 'auto';
    errorPopup.style.background = 'rgba(255,58,58,0.9)';
    errorPopup.style.border = '3px solid rgba(255,0,0,0.5)';
    errorPopup.style.borderRadius = '10px';
    errorPopup.style.top = '25%';
    errorPopup.style.left = '40%';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.fontSize = '20px';
    errorPopup.style.cursor = 'pointer';
    errorPopup.style.color = 'white';
    errorPopup.appendChild(errorMessageText);
    document.querySelector('main').appendChild(errorPopup);

    const closeErrorPopup = () => {
      errorPopup.style.display = 'none';
    };
    errorPopup.addEventListener('click', closeErrorPopup);
    setTimeout(closeErrorPopup, ERROR_TIMEOUT);
  };

  const requestHandler = (onLoad, showError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.ERROR_REQUEST) {
        showError('Неверный запрос:' + xhr.status + ' ' + xhr.statusText);
      } else if (xhr.status === statusCode.NOT_FOUND) {
        showError('Не найдено: ' + xhr.status + ' ' + xhr.statusText);
      } else if (xhr.status === statusCode.EROR_SERVER) {
        showError('Ошибка сервера:' + xhr.status + ' ' + xhr.statusText);
      } else if (xhr.status !== statusCode.OK) {
        showError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      } else {
        onLoad(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      showError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      showError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    return xhr;
  };

  window.client = {
    load: (onLoad, showError) => {
      const xhr = requestHandler(onLoad, showError);
      xhr.open('GET', GET_URL);
      xhr.send();
    },
    send: (data, onLoad, showError) => {
      const xhr = requestHandler(onLoad, showError);
      xhr.open('POST', POST_URL);
      xhr.send(data);
    },
    showError: showErrorMessage
  };
})();
