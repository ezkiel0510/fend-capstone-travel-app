const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const getDays = (d1, d2) => {
  const diff = d2 - d1;
  if (diff < 0) return 0;
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
};

export { removeAllChildNodes, getDays };
