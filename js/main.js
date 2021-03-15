import { renderPhotos } from './picture.js';
import { getBigPicture } from './big-picture.js';
import { setFormSubmit } from './sending-form.js'
import './validation-form.js';
import { getData } from './api.js';

getData((pictures) => {
  renderPhotos(pictures);
  getBigPicture(pictures);
});

setFormSubmit();
