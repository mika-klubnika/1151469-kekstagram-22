import { renderPhotos } from './picture.js';
import { bigPictureHandler } from './big-picture.js';
import { setFormSubmit } from './sending-form.js'
import './validation-form.js';
import { getData } from './api.js';

getData((pictures) => {
  renderPhotos(pictures);
  bigPictureHandler(pictures);
});

setFormSubmit();
