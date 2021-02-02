'use strict';

const getRandomNumber = (min, max) => {
  if (min < 0 || max < 0 || min == max) {
    return 'Введите положительные числа неравные друг другу';
  } else if (min > max) {
    return 'Введите числа от меньшего к большему';
  } else {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }
};

getRandomNumber(3, 9);
getRandomNumber(-5, -2);
getRandomNumber(10, 2);
getRandomNumber(1.5, 9.2);

const checksLengthString = (comment, maxLengthComment) => {
  maxLengthComment = 140;

  if (comment.length < maxLengthComment) {
    return 'строка проходит по длине';
  } else {
    return 'строка не проходит по длине';
  }
};

checksLengthString('Lorem ipsum dolor sit amet consectetur adipisicing');
