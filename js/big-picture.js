import { isEscEvent, renderNodeList } from './util.js'
import { randomPhotos } from './picture.js'
import { body } from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const loaderComment = bigPicture.querySelector('.comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onModalCloseClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentCount.classList.add('hidden');
  loaderComment.classList.add('hidden');

  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureClose.addEventListener('click', onModalCloseClick);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  bigPictureClose.removeEventListener('click', onModalCloseClick);
};

const getCommentNodes = (comments = []) => comments.map(comment => {
  const node = socialComment.cloneNode(true);
  node.querySelector('img').src = comment.avatar;
  node.querySelector('img').alt = comment.name;
  node.querySelector('p').textContent = comment.message;
  return node;
});


const showBigPicture = (picture, photo) => {
  bigPictureImg.src = picture.src;
  likes.textContent = photo.likes;
  description.textContent = photo.description;
  renderNodeList(socialComments, getCommentNodes(photo.comments))
};

const getPhotoInfo = (id) => randomPhotos.find(photo => photo.id === +id);

picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.className === 'picture__img') {
    evt.preventDefault();
    openModal();
    showBigPicture(evt.target, getPhotoInfo(evt.target.dataset.id))
  }
});