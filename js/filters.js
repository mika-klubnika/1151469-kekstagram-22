import { getData, img } from './api.js';

const filtersContainer = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default'); //По умолчанию
const filterRandom = document.querySelector('#filter-random'); //Случайные
const filterDiscussed = document.querySelector('#filter-discussed'); //Обсуждаемые
const buttons = document.querySelectorAll('.img-filters__button');
// const DEBOUNCE = 500;

const getButtons = (evt) => {
  const target = evt.target;
  const activeFilter = document.querySelector('.img-filters__button--active');

  if (activeFilter) {
    activeFilter.classList.remove('img-filters__button--active');
  }
  target.classList.add('img-filters__button--active');
};

buttons.forEach(button => {
  button.addEventListener('click', getButtons)
});

//Default
filterDefault.addEventListener('click', () => {
  img;
  console.log("🚀 ~ file: filters.js ~ line 29 ~ filterDefault.addEventListener ~ aa", img)
});

//Random
filterRandom.addEventListener('click', () => {
  const mixedPictures = img.sort(() => Math.random() - 0.5).slice(0, 10);
  console.log("🚀 ~ file: filters.js ~ line 39 ~ ", mixedPictures);
});

//Discussed
const sortPictureByCommented = (pictureA, pictureB) => {
  const commentA = pictureA.comments.length;
  const commentB = pictureB.comments.length;
  return commentB - commentA;
}

filterDiscussed.addEventListener('click', () => {
  const popularPictures = img.sort(sortPictureByCommented)
  console.log("🚀 ~ file: filters.js ~ line 51 ~ ", popularPictures)
});



export { filtersContainer }
