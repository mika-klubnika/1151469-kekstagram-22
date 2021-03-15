import { sendData } from './api.js';
import { isEscEvent } from './util.js'

const uploadForm = document.querySelector('.img-upload__form');
const main = document.querySelector('main');

const MessagesBlockKeys = {
  SUCCESS: 'success',
  ERROR: 'error',
}

const addMessageElement = id => {
  const node = document.querySelector(`#${id}`).content.cloneNode(true)
  main.appendChild(node)
};

const onCloseMessage = (key) => {
  const className = `.${key}`;
  const messageBlock = main.querySelector(className);

  const closeMessage = () => {
    messageBlock.remove();
    document.removeEventListener('keydown', onCloseKeydown);
  };

  const onCloseKeydown = (evt) => {
    if (isEscEvent(evt)) {
      closeMessage(evt.target.className);
    }
  };

  const onCloseClick = (evt) => {
    const target = evt.target;
    if (target.classList.contains(key) || target.classList.contains(`${key}__button`)) {
      closeMessage(target.className);
    }
  };

  messageBlock.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onCloseKeydown);
};

const showMessage = (key) => {
  addMessageElement(key);
  onCloseMessage(key);
}

//Сообщение об успехе
const showMessageSuccess = () => showMessage(MessagesBlockKeys.SUCCESS);

//Сообщение об ошибке
const showMessageError = () => showMessage(MessagesBlockKeys.ERROR);

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

export { setFormSubmit, uploadForm }
