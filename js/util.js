import { MIN_ELEMENTS } from './constants.js';
import { getComments } from './mocks.js';


//Рандомный целые положительные числа
const getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return 0;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

//Проверка длины строки
const checkStringLength = (comment, maxLengthComment) => {
  if (comment.length > maxLengthComment) {
    return false;
  }
  return true;
};

checkStringLength('Lorem ipsum dolor sit amet consectetur adipisicing', 60);

//Рандомный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

//Рандомное кол-во строк для комента
const getRandomArray = (array, length) => {
  const arrayCopy = [...array];
  for (let i = 0; i < (array.length - length); i++) {
    arrayCopy.splice(getRandomInt(0, arrayCopy.length), 1)
  }
  return arrayCopy;
};

//Функция конкатенации строк
const getRandomMessage = (comments, stringsCount) => {
  return getRandomArray(comments, stringsCount).join(' ');
};

//Массив рандомных уникальных чисел
const getRandomNumbers = (min, max) => {
  const numbers = [];

  const uniqueNumbers = () => {
    const id = getRandomInt(min, max);
    const checkId = numbers.some(item => item === id);
    if (checkId) {
      return uniqueNumbers()
    }
    numbers.push(id);
    return id;
  };
  return new Array(max).fill().map(item => uniqueNumbers(item));
};

//получаем рандомный id для объекта коментов
const getCommentsIds = (commentsCount) => getRandomNumbers(MIN_ELEMENTS, commentsCount).map(id => getComments(id));

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

//получем набор node
const renderNodeList = (parent, nodes = []) => {
  parent.textContent = '';
  parent.append(...nodes);
};

export {
  getRandomInt,
  getRandomArrayElement,
  getRandomMessage,
  getCommentsIds,
  getRandomNumbers,
  isEscEvent,
  renderNodeList
};
