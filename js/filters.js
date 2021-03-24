/* global _:readonly */
import { getPreviewPhotos } from './picture.js';
import { getBigPicture } from './big-picture.js';
import { DELAY } from './constants.js';
import {
  getMixedPictures,
  sortPictureByCommented
} from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

const removePicture = () => document.querySelectorAll('.picture').forEach(element => element.remove());

const getButtons = (evt) => {
  const target = evt.target;
  const activeButton = document.querySelector('.img-filters__button--active');

  if (target.className === 'img-filters__button') {
    if (activeButton !== target) {
      activeButton.classList.remove('img-filters__button--active');
      target.classList.add('img-filters__button--active');
    }
  }
};

const createOnClick = (pictures) => _.throttle((evt) => {
  const targetId = evt.target.id;

  const orderedListItemsPictures = new Set(pictures);
  const arrayOrderedListItemsPictures = [...orderedListItemsPictures];

  removePicture();

  switch (targetId) {
    case 'filter-random':
      getPreviewPhotos(getMixedPictures(arrayOrderedListItemsPictures));
      getBigPicture(arrayOrderedListItemsPictures);
      break;
    case 'filter-discussed':
      getPreviewPhotos((arrayOrderedListItemsPictures).sort(sortPictureByCommented));
      getBigPicture(arrayOrderedListItemsPictures);
      break;
    default:
      getPreviewPhotos(arrayOrderedListItemsPictures);
      getBigPicture(arrayOrderedListItemsPictures);
  }
}, DELAY);

const getPictureForFilters = (pictures) => {
  const onClick = createOnClick(pictures);

  const onFiltersContainerFocus = () => {
    filtersForm.addEventListener('click', onClick, true);
  }

  const onFiltersContainerBlur = () => {
    filtersForm.removeEventListener('click', onClick, true);
  }

  filtersContainer.addEventListener('focus', onFiltersContainerFocus, true);
  filtersContainer.addEventListener('blur', onFiltersContainerBlur, true);
  filtersContainer.addEventListener('click', getButtons);
};

export { filtersContainer, getPictureForFilters }
