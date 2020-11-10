'use strict';

(function () {
  const TIMEOUT = 10000;
  const ERROR_TIMEOUT = 5000;
  const CODE_OK = 200;
  const GET_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const POST_URL = 'https://js.dump.academy/keksobooking';

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


  const load = (onLoad, showError) => {

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_OK) {
        const data = xhr.response;
        onLoad(data);
      } else {
        showError('Ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      showError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      showError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
    xhr.open('GET', GET_URL);
    xhr.send();
  };
  const send = (data, onLoad, showError) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_OK) {
        onLoad();
      } else {
        showError('Ошибка! Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      showError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      showError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', POST_URL);
    xhr.send(data);
  };


  // EXPORT
  window.client = {
    load,
    send,
    showError: showErrorMessage
  };
})();
