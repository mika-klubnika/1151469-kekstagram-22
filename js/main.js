// с mdn
const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(2,6)


const checksLengthString = (comment) => {
  if(comment.length < 140) {
    return 'строка проходит по длине';
  } else {
    return 'строка не проходит по длине';
  }
}

checksLengthString('Lorem ipsum dolor sit amet consectetur adipisicing');

