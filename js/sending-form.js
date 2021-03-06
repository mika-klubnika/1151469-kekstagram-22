import { sendData } from './api.js';
import { isEscEvent } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const main = document.querySelector('main');

const MessagesBlockKeys = {
  SUCCESS: 'success',
  ERROR: 'error',
  DATA_ERROR: 'data-loading-error',
}

const addMessageElement = id => {
  const node = document.querySelector(`#${id}`).content.cloneNode(true)
  main.appendChild(node)
};

const closeMessage = (key) => {
  const className = `.${key}`;
  const messageBlock = main.querySelector(className);

  const removeMessage = () => {
    messageBlock.remove();
    document.removeEventListener('keydown', onCloseKeydown);
  };

  const onCloseKeydown = (evt) => {
    if (isEscEvent(evt)) {
      removeMessage(evt.target.className);
    }
  };

  const onCloseClick = (evt) => {
    const target = evt.target;
    if (target.classList.contains(key) || target.classList.contains(`${key}__button`)) {
      removeMessage(target.className);
    }
  };

  messageBlock.addEventListener('click', onCloseClick);
  document.addEventListener('keydown', onCloseKeydown);
};

const showMessage = (key) => {
  addMessageElement(key);
  closeMessage(key);
}

//Сообщение об успехе
const showMessageSuccess = () => showMessage(MessagesBlockKeys.SUCCESS);

//Сообщение об ошибке
const showMessageError = () => showMessage(MessagesBlockKeys.ERROR);

//Сообщение об ошибке загрузки данных
const showMessageDataLoadingError = () => addMessageElement(MessagesBlockKeys.DATA_ERROR);

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

export { setFormSubmit, uploadForm, showMessageDataLoadingError }
