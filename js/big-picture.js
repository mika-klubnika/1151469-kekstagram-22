import {
  renderNodeList,
  createOnModalEscKeydown,
  createOnModalCloseClick
} from './util.js';
import { VISIBLE_COMMENTS } from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.comments-count');
const moreCommentsButton = bigPicture.querySelector('.comments-loader');
let commentsCountOpen = bigPicture.querySelector('.comments-count-open');

const createShowMoreComments = (comments, index) => {
  const cloneComments = [...comments];
  let indexOfHidden = index;
  let commentsCount = index;
  let hiddenComments;

  return () => {
    hiddenComments = cloneComments.slice(indexOfHidden, indexOfHidden + VISIBLE_COMMENTS);
    const hiddenCommentsLength = hiddenComments.length;

    commentsCountOpen.textContent = commentsCount + hiddenCommentsLength;

    hiddenComments.forEach(comment => {
      comment.classList.remove('hidden');
    })

    if (cloneComments.length === (commentsCount + hiddenCommentsLength)) {
      moreCommentsButton.classList.add('hidden')
    }

    indexOfHidden += VISIBLE_COMMENTS;
    commentsCount += hiddenCommentsLength;
  }
};

const openModal = (moreCommentsCallback) => {
  const closeModal = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onModalEscKeydown);
    bigPictureClose.removeEventListener('click', onModalCloseClick);
    moreCommentsButton.removeEventListener('click', moreCommentsCallback);
  }

  const onModalEscKeydown = createOnModalEscKeydown(closeModal);
  const onModalCloseClick = createOnModalCloseClick(closeModal);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureClose.addEventListener('click', onModalCloseClick);
  moreCommentsButton.addEventListener('click', moreCommentsCallback);
};

const getCommentNodes = (comments = []) => comments.map((comment, index) => {
  const node = socialComment.cloneNode(true);
  node.querySelector('img').src = comment.avatar;
  node.querySelector('img').alt = comment.name;
  node.querySelector('p').textContent = comment.message;
  if (index > VISIBLE_COMMENTS - 1) {
    node.classList.add('hidden');
  }
  return node;
});

const showBigPicture = (picture, photo) => {
  bigPictureImg.src = picture.src;
  likes.textContent = photo.likes;
  description.textContent = photo.description;
  const comments = getCommentNodes(photo.comments);
  renderNodeList(socialComments, comments);

  const commentsLength = comments.length;
  const isFewerCommentsThanNeed = commentsLength <= VISIBLE_COMMENTS;

  const showMoreComments = createShowMoreComments(comments, VISIBLE_COMMENTS);

  commentsCount.textContent = commentsLength;
  commentsCountOpen.textContent = isFewerCommentsThanNeed ? commentsLength : VISIBLE_COMMENTS;
  isFewerCommentsThanNeed ? moreCommentsButton.classList.add('hidden') : moreCommentsButton.classList.remove('hidden');

  openModal(showMoreComments);
};

const getBigPicture = (pictures) => {
  const getPhotoInfo = (id) => pictures.find(photo => photo.id === +id);

  picturesContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.className === 'picture__img') {
      evt.preventDefault();
      showBigPicture(target, getPhotoInfo(target.dataset.id))
    }
  });
};

export { getBigPicture }
