import { DEBOUNCE_TIME } from './data.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

// Перемешивание массива
const shuffleArray = (arrays) => {
  for (let i = arrays.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrays[i], arrays[randomIndex]] = [arrays[randomIndex], arrays[i]];
  }
  return arrays;
};

// Функция debounce для устранения дребезга
const debounce = (callback, timeoutDelay = DEBOUNCE_TIME) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, shuffleArray, debounce };
