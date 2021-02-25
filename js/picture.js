import { getUserGallery } from './mocks.js';

const otherPhotos = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const randomPhotos = getUserGallery();

const pictureListFragment = document.createDocumentFragment();

randomPhotos.forEach((picture) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
  photoElement.querySelector('.picture__img').dataset.id = picture.id;
  pictureListFragment.appendChild(photoElement);
});

otherPhotos.appendChild(pictureListFragment);

export { randomPhotos };
