import { getPreviewPhotos } from './picture.js';
import { getBigPicture } from './big-picture.js';
import { setFormSubmit, showMessageDataLoadingError } from './sending-form.js'
import './validation-form.js';
import { getData } from './api.js';
import { filtersContainer, getPictureForFilters } from './filters.js';

getData((pictures) => {
  getPreviewPhotos(pictures);
  getBigPicture(pictures);
  getPictureForFilters(pictures);
  filtersContainer.classList.remove('img-filters--inactive');
},
(error) => showMessageDataLoadingError(error),
);

setFormSubmit();
