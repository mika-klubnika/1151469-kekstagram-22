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

export {
  isEscEvent,
  renderNodeList,
  getMixedPictures,
  sortPictureByCommented,
  createOnModalEscKeydown,
  creteOnModalCloseClick
};
