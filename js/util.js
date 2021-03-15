//Проверка Escape
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
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
