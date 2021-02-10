'use strict';

const MIN_USER_PUBLICATION = 1;
const USER_PUBLICATION = 25;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const MIN_NUMBER_LIKES = 15;
const MAX_NUMBER_LIKES = 200;
const MIN_NUMBER_COMMENTS = 1;
const MAX_NUMBER_COMMENTS = 5;

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

//Рандомные целые положительные числа
const getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return 0;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

//Проверка длины строки
const checksLengthString = (comment, maxLengthComment) => {
  if (comment.length > maxLengthComment) {
    return false;
  }
  return true;
};

checksLengthString('Lorem ipsum dolor sit amet consectetur adipisicing', 60);

//Рандомный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

//генерируем рандомное кол-во строк для комента
const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for(let i = 0; i < (array.length - length); i++) {
    arrayCopy.splice(getRandomInt(0, arrayCopy.length), 1)
  }
  return arrayCopy;
};

//Функция конкатенации строк
const getRandomMessage = (comments, stringCount) => {
  return getRandomArray(comments, stringCount).join(' ');
};


//Объект комментариев
const getComments = (id) => {
  return {
    id: id,
    avatar: `img/avatar-${getRandomInt(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)}.svg`,
    message: getRandomMessage(COMMENTATORS_MESSAGES, getRandomInt(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS)),
    name: getRandomArrayElement(COMMENTATORS_NAMES),
  };
};

//Массив рандомных уникальных чисел
const getRandomNumbers = (min, max) => {
  const numbers = [];

  const uniqueNumbers = () => {
    const id = getRandomInt(min, max);
    const checkId = numbers.some(item => item ===id);
    if(checkId) {
      return uniqueNumbers()
    }
    numbers.push(id);
    return id;
  };
  return new Array(max).fill().map(item => uniqueNumbers(item));
};

//получаем рандомный id для объекта коментов
const getIdComments = (commentsNumber) => getRandomNumbers(1, commentsNumber).map(id => getComments(id));

//Объект постов юзера
const getPublishedPhoto = (id) => {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION_PHOTOS),
    likes: getRandomInt(MIN_NUMBER_LIKES, MAX_NUMBER_LIKES),
    comments: getIdComments(getRandomInt(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS)),
  };
};

const userGallery = getRandomNumbers(MIN_USER_PUBLICATION, USER_PUBLICATION).map((id) => getPublishedPhoto(id));
userGallery;
