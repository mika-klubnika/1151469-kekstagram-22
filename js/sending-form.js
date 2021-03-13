import { sendData } from './api.js';
import { isEscEvent } from './util.js'

const uploadForm = document.querySelector('.img-upload__form');
const main = document.querySelector('main');
const templateMessageSuccess = document.querySelector('#success').content.cloneNode(true);
const templateMessageError = document.querySelector('#error').content.cloneNode(true);

const addMessageElement = node => main.appendChild(node);

const onCloseMessage = (className) => {
  const closeMessage = () => {
    main.querySelector(className).remove();
    main.removeEventListener('click', onCloseClick);
    document.removeEventListener('keydown', onCloseKeydown);
  };

  const onCloseKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessage(evt.target.className);
    }
  };

  const onCloseClick = (evt) => {
    closeMessage(evt.target.className);
  };

  main.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onCloseKeydown);
};

const onShowMessage = (element, className) => {
  addMessageElement(element);
  onCloseMessage(className);
}

//Сообщение об успехе
const showMessageSuccess = () => onShowMessage(
  templateMessageSuccess,
  '.success',
);

//Сообщение об ошибке
const showMessageError = () => onShowMessage(
  templateMessageError,
  '.error',
);

//Отправка формы
const setFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => showMessageSuccess(),
      () => showMessageError(),
      new FormData(evt.target),
    );
  });
};

export { setFormSubmit }
