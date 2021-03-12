import {
  closeModal,
  showMessageError,
  showMessageSuccess
} from './upload-form.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((picture) => {
      onSuccess(picture);
    });
};

const sendData = (onSuccess, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        showMessageSuccess();
      } else {
        showMessageError();
        closeModal();
      }
    })
    .catch(() => {
      showMessageError();
      closeModal();
    });
};

export { getData, sendData }
