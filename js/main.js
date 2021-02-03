'use strict';

const getRandomNumber = (min, max) => {
  if (min < 0 || min >= max) {
    return 0;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

getRandomNumber(3, 9);

const checksLengthString = (comment, maxLengthComment) => {
  if (comment.length > maxLengthComment) {
    return false;
  }
  return true;
};

checksLengthString('Lorem ipsum dolor sit amet consectetur adipisicing', 60);
