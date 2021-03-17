import { closeModal } from './upload-form.js';

let img = [];

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((picture) => {
      onSuccess(picture);
      img = picture;
    });
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

export { getData, sendData, img }
