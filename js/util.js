//Проверка Escape
const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

//получем набор node
const renderNodeList = (parent, nodes = []) => {
  parent.textContent = '';
  parent.append(...nodes);
};

export {
  isEscEvent,
  renderNodeList
};
