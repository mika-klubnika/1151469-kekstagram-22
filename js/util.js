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

//Рандомное кол-во строк для комента
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

export{getRandomInt, getRandomArrayElement, getRandomMessage};
