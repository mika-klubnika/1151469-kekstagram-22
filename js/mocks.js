import {
  getRandomInt,
  getRandomArrayElement,
  getRandomMessage,
  getCommentsIds,
  getRandomNumbers
} from './util.js';

import {
  MAX_USER_PUBLICATION,
  MAX_NUMBER_AVATAR,
  MIN_NUMBER_LIKES,
  MAX_NUMBER_LIKES,
  MAX_NUMBER_COMMENTS,
  DESCRIPTION_PHOTOS,
  COMMENTATORS_MESSAGES,
  COMMENTATORS_NAMES,
  MIN_ELEMENTS
} from './variables.js';

//Объект комментариев
const getComments = (id) => {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(MIN_ELEMENTS, MAX_NUMBER_AVATAR)}.svg`,
    message: getRandomMessage(COMMENTATORS_MESSAGES, getRandomInt(MIN_ELEMENTS, MAX_NUMBER_COMMENTS)),
    name: getRandomArrayElement(COMMENTATORS_NAMES),
  };
};

//Объект постов юзера
const getPublishedPhoto = (id) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomInt(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
    comments: getCommentsIds(getRandomInt(MIN_ELEMENTS, MAX_NUMBER_COMMENTS)),
  };
};

const userGallery = getRandomNumbers(MIN_ELEMENTS, MAX_USER_PUBLICATION).map((id) => getPublishedPhoto(id));
userGallery;

export { getComments };
