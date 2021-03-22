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
let commentsCountOpen = bigPicture.querySelector('.comments-count-open');

const commentsCount = bigPicture.querySelector('.comments-count'); //сколько всего комментов
const moreCommentsButton = bigPicture.querySelector('.comments-loader'); //Загрузить еще
const VISIBLE_COMMENTS = 5;
let comments;



// const quack = (comments) => {
//   for (let i = 0; i < comments.length; i++) {
//     if (comments.length <= 5) {
//       console.log('1')
//       moreCommentsButton.classList.add('hidden');
//     }
//     else if (comments[i] >= comments.length) {
//       console.log('2')
//       moreCommentsButton.classList.add('hidden');
//     }
//     else {
//       console.log('3')
//       moreCommentsButton.classList.remove('hidden');
//     }
//   }
// }

const createShowMoreComments = (index) => {
  let indexOfHidden = index;
  let hiddenComments;

  return () => {
    hiddenComments = comments.slice(indexOfHidden, indexOfHidden + VISIBLE_COMMENTS);

    hiddenComments.forEach(comment => {
      comment.classList.remove('hidden');
    })
    indexOfHidden += VISIBLE_COMMENTS;
  }
};

const showMoreComments = createShowMoreComments(VISIBLE_COMMENTS);

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

  document.addEventListener('keydown', onModalEscKeydown);
  bigPictureClose.addEventListener('click', onModalCloseClick);
  moreCommentsButton.addEventListener('click', showMoreComments);
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  bigPictureClose.removeEventListener('click', onModalCloseClick);
  moreCommentsButton.removeEventListener('click', showMoreComments);
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
  comments = getCommentNodes(photo.comments);
  renderNodeList(socialComments, comments);
  commentsCount.textContent = comments.length;

  // quack(comments)
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
