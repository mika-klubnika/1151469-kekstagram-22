import { closeModal } from './upload-form.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((picture) => {
      onSuccess(picture);
    });
};

const sendData = (messageSuccess, messageError, body) => {
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
        messageSuccess();
      } else {
        closeModal();
        messageError();
      }
    })
    .catch(() => {
      closeModal();
      messageError();
    });
};

export { getData, sendData }
