import { ALERT_SHOW_TIME } from './constants.js';

//Проверка Escape
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const createOnModalEscKeydown = (cb) => {
  return (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      cb();
    }
  }
};

const creteOnModalCloseClick = (cb) => {
  return (evt) => {
    evt.preventDefault();
    cb();
  }
};

//получем набор node
const renderNodeList = (parent, nodes = []) => {
  parent.textContent = '';
  parent.append(...nodes);
};

const getMixedPictures = (picture) => picture.sort(() => Math.random() - 0.5).slice(0, 10);

const sortPictureByCommented = (pictureA, pictureB) => {
  const commentA = pictureA.comments.length;
  const commentB = pictureB.comments.length;
  return commentB - commentA;
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {
  isEscEvent,
  renderNodeList,
  getMixedPictures,
  sortPictureByCommented,
  createOnModalEscKeydown,
  creteOnModalCloseClick,
  showAlert
};
