const bodyEl = document.body;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (element) => element[getRandomInteger(0, element.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const showalert = (message) => {
  const alertContainet = document.createElement('div');
  alertContainet.classList.add('alert');
  alertContainet.textContent = message;

  bodyEl.append(alertContainet);
};

const debounce = (callback, timeoutDelay = 1000) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomArrayElement,
  getRandomInteger,
  isEscapeKey,
  bodyEl,
  showalert,
  debounce
};
