import { userGallery } from './mocks.js';

const otherPhotos = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content;

const randomPhoto = userGallery();
const pictureListFragment = document.createDocumentFragment();

randomPhoto.forEach((picture) => {
  const photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureListFragment.appendChild(photoElement);
});

otherPhotos.appendChild(pictureListFragment);
