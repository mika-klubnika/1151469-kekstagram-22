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
  MIN_ELEMENTS
} from './constants.js';


const DESCRIPTION_PHOTOS = [
  'Каталась на лошадке. Высоченный, седло пришлось в прыжке на него закидывать',
  'Каждый день влюбляюсь в этот город всë больше',
  'Не знаю, почему мне так нравятся эти пушисто-шуршащие штучки',
  'Какая всë-таки этом году сказочная зима',
  'Наверное, можно бесконечно возвращаться в это место и каждый раз вааау',
  'Вот такой мой маленький уютный рабочий уголок',
];

const COMMENTATORS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTATORS_NAMES = [
  'Евсей',
  'Аннушка',
  'Святозар',
  'Элина',
  'Кавалькада',
  'Люсетта',
];

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

const userGallery = () => getRandomNumbers(MIN_ELEMENTS, MAX_USER_PUBLICATION).map((id) => getPublishedPhoto(id));

userGallery;

export { userGallery, getComments };
