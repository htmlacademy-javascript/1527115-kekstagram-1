const bodyEl = document.body;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAllert = (message) => {
  const allertContainet = document.createElement('div');
  allertContainet.style.zIndex = '100';
  allertContainet.style.position = 'fixed';
  allertContainet.style.bottom = '0';
  allertContainet.style.width = '100vw';
  allertContainet.style.textAlign = 'center';
  allertContainet.style.backgroundColor = 'red';
  allertContainet.style.color = 'white';
  allertContainet.textContent = message;

  bodyEl.append(allertContainet);
};

export {
  getRandomArrayElement,
  getRandomInteger,
  isEscapeKey,
  bodyEl,
  showAllert
};
