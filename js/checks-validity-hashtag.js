const MAX_HASHTAGS = 5;
const MAX_SYMBOLS = 20;

let errorMessage = '';

const error = () => errorMessage;


const isHashtagsValid = (value) => {
  errorMessage = '';
  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);
  const hashtagsSet = new Set();

  for (const item of inputArray) {
    // Проверки и установка сообщения об ошибке
    if (item === '#') {
      errorMessage = 'Хештег не может состоять только из одной решётки';
      return false;
    }
    if (item.slice(1).includes('#')) {
      errorMessage = 'Хештеги нужно разделить пробелом';
      return false;
    }
    if (item[0] !== '#') {
      errorMessage = 'Хештег должен начинаться с символа \'#\'';
      return false;
    }
    if (hashtagsSet.has(item)) {
      errorMessage = 'Хештег не может повторяться';
      return false;
    }
    hashtagsSet.add(item);

    if (item.length > MAX_SYMBOLS) {
      errorMessage = `Длина одного хештега не должна превышать ${MAX_SYMBOLS} символов`;
      return false;
    }
    if (inputArray.length > MAX_HASHTAGS) {
      errorMessage = `Нельзя указать более ${MAX_HASHTAGS} хештегов`;
      return false;
    }
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(item)) {
      errorMessage = 'Хештег содержит недопустимые символы';
      return false;
    }
  }

  return true; // Все проверки пройдены
};

export { error, isHashtagsValid };
