import './mocks.js';
import { renderPhotos } from './picture.js';
import './big-picture.js';
import { setFormSubmit, closeModal } from './upload-form.js';
import './upload-form-validation.js';
import { getData } from './api.js';

getData((picture) => {
  renderPhotos(picture);
});

// уберу после консультации

// fetch('https://22.javascript.pages.academy/kekstagram/data')
//   .then((response) => response.json())
//   .then((picture) => {
//     renderPhotos(picture);
//   });

setFormSubmit(closeModal);
