import { closeModal } from './upload-form.js';

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      onSuccess(pictures);
    })
    .catch((error) => onFail(error));
};

const sendData = (onMessageSuccess, onMessageError, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        closeModal();
        onMessageSuccess();
      } else {
        closeModal();
        onMessageError();
      }
    })
    .catch(() => {
      closeModal();
      onMessageError();
    });
};

export { getData, sendData }
