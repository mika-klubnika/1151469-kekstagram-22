//Проверка Escape
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

//Рандомный целые положительные числа
const getRandomInt = (min, max) => {
  if (min < 0 || min >= max) {
    return 0;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
};

//Рандомный элемент массива
const getRandomArrayElement = (elements) => {
  return elements[getRandomInt(0, elements.length - 1)];
};

//получем набор node
const renderNodeList = (parent, nodes = []) => {
  parent.textContent = '';
  parent.append(...nodes);
};

export {
  isEscEvent,
  renderNodeList,
  getRandomArrayElement
};
