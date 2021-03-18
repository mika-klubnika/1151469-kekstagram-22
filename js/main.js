import { getPreviewPhotos } from './picture.js';
import { getBigPicture } from './big-picture.js';
import { setFormSubmit } from './sending-form.js'
import './validation-form.js';
import { getData } from './api.js';
import { filtersContainer } from './filters.js'

getData((pictures) => {
  getPreviewPhotos(pictures);
  getBigPicture(pictures);
  filtersContainer.classList.remove('img-filters--inactive');
});

setFormSubmit();
