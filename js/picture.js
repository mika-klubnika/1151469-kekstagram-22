const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const getPreviewPhotos = (photos) => {

  const pictureListFragment = document.createDocumentFragment();

  photos.forEach((picture) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = picture.url;
    photoElement.querySelector('.picture__likes').textContent = picture.likes;
    photoElement.querySelector('.picture__comments').textContent = picture.comments.length;
    photoElement.querySelector('.picture__img').dataset.id = picture.id;
    pictureListFragment.appendChild(photoElement);
  });

  pictures.appendChild(pictureListFragment);
};

export { getPreviewPhotos, pictures };
