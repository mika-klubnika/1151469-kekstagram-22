'use strict';

const getRandomNumber = (min, max) => {
  if (min < 0 || min >= max) {
    return 0;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

const checksLengthString = (comment, maxLengthComment) => {
  if (comment.length > maxLengthComment) {
    return false;
  }
  return true;
};

checksLengthString('Lorem ipsum dolor sit amet consectetur adipisicing', 60);

const DESCRIPTION_PHOTOS = [
  'Каталась на лошадке. Высоченный, седло пришлось в прыжке на него закидывать',
  'Каждый день влюбляюсь в этот город всë больше',
  'Не знаю, почему мне так нравятся эти пушисто-шуршащие штучки',
  'Какая всë-таки этом году сказочная зима',
  'Наверное, можно бесконечно возвращаться в это место и каждый раз вааау',
  'Вот такой мой маленький уютный рабочий уголок',
];

const COMMENTATORS_MESSAGE = [
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

const USER_PUBLICATION = 25;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

// рандомный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

// создаем объект комментаторов
const commentators = (id) => {
  return {
    id: ++id * 32,
    avatar: `img/avatar-${getRandomNumber(MIN_AVATAR, MAX_AVATAR)}.svg`,
    message: getRandomArrayElement(COMMENTATORS_MESSAGE),
    name: getRandomArrayElement(COMMENTATORS_NAMES),
  };
};

const randomComments = new Array(6).fill().map((item, i) => commentators(i));


// создаем объект постов юзера
const publishedPhoto = (id) => {
  return {
    id: ++id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    comments: getRandomArrayElement(randomComments),
  };
};

const userGallery = new Array(USER_PUBLICATION).fill().map((item, i) => publishedPhoto(i));
console.log(userGallery);
