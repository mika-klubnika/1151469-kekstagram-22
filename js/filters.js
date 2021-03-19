/* global _:readonly */
import { getData } from './api.js';
import { getPreviewPhotos } from './picture.js';
import { getBigPicture } from './big-picture.js';


const filtersContainer = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default'); //По умолчанию
const filterRandom = document.querySelector('#filter-random'); //Случайные
const filterDiscussed = document.querySelector('#filter-discussed'); //Обсуждаемые
const buttons = document.querySelectorAll('.img-filters__button');
const DEBOUNCE = 500;

const removePicture = () => document.querySelectorAll('.picture').forEach(element => { element.remove() });

const getButtons = (evt) => {
  const target = evt.target;
  const activeButton = document.querySelector('.img-filters__button--active');

  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  target.classList.add('img-filters__button--active');
};

buttons.forEach(button => { button.addEventListener('click', getButtons) });

//Default
filterDefault.addEventListener('click', _.debounce(() => {
  removePicture()

  getData((picture) => {
    getPreviewPhotos(picture);
    getBigPicture(picture);
  });
}, DEBOUNCE));

//Random
const getMixedPictures = (picture) => picture.sort(() => Math.random() - 0.5).slice(0, 10);

filterRandom.addEventListener('click', _.debounce(() => {
  removePicture()

  getData((picture) => {
    getPreviewPhotos(getMixedPictures(picture));
    getBigPicture(picture);
  });
}, DEBOUNCE));

//Discussed
const sortPictureByCommented = (pictureA, pictureB) => {
  const commentA = pictureA.comments.length;
  const commentB = pictureB.comments.length;
  return commentB - commentA;
}

filterDiscussed.addEventListener('click', _.debounce(() => {
  removePicture()

  getData((picture) => {
    getPreviewPhotos((picture).sort(sortPictureByCommented));
    getBigPicture(picture);
  });
}, DEBOUNCE));


export { filtersContainer }
