import { closeModal } from './upload-form.js';
import { filters } from './filters.js'


const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((picture) => {
      console.log("🚀 ~ file: api.js ~ line 9 ~ .then ~ picture", picture)
      onSuccess(picture);
      filters.classList.remove('img-filters--inactive');
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
