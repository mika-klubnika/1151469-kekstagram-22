import { isEscEvent, renderNodeList } from './util.js'

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');



const commentsList = bigPicture.querySelector('.social__comments');
const commentsTemplate = bigPicture.querySelectorAll('.social__comment').content;
const blockCommentsCount = bigPicture.querySelector('.social__comment-count'); //div
const commentsCount = bigPicture.querySelector('.comments-count'); //сколько всего комментов
const buttonMoreComments = bigPicture.querySelector('.comments-loader'); //Загрузить еще
const VISIBLE_COMMENTS = 5;
let comments;


const showMoreComments = () => {
  if (comments > VISIBLE_COMMENTS) {
    blockCommentsCount.classList.remove('hidden');
    buttonMoreComments.classList.remove('hidden');
  } else {
    blockCommentsCount.classList.add('hidden');
    buttonMoreComments.classList.add('hidden');
  }
};




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
  document.body.classList.add('modal-open');
  // blockCommentsCount.classList.add('hidden');
  // buttonMoreComments.classList.add('hidden');

  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureClose.addEventListener('click', onModalCloseClick);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

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
  comments = photo.comments.length;
  showMoreComments(comments);
};

const getBigPicture = (pictures) => {
  const getPhotoInfo = (id) => pictures.find(photo => photo.id === +id);

  picturesContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.className === 'picture__img') {
      evt.preventDefault();
      openModal();
      showBigPicture(target, getPhotoInfo(target.dataset.id))
    }
  });
};

export { getBigPicture }
