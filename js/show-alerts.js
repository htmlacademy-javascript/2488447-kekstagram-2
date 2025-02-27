import { isEscapeKey } from './utils.js';
import {ALERT_SHOW_TIME} from './data.js';

let isErrorModalOpen = false; // Флаг для отслеживания состояния модального окна с ошибкой

const showModal = (templateSelector) => {
  const template = document.querySelector(templateSelector).content.cloneNode(true);
  const container = template.querySelector('section');
  document.body.append(container);
  isErrorModalOpen = true;

  const onCloseModalClick = () => {
    container.remove();
    isErrorModalOpen = false;
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeydown(evt) {
    if (isEscapeKey(evt) && isErrorModalOpen) {
      evt.preventDefault();
      onCloseModalClick();
    }
  }

  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onOutsideClick);

  // Если клик вне блока .error__inner или .success__inner
  function onOutsideClick(evt) {
    if (!evt.target.closest('.error__inner') && !evt.target.closest('.success__inner')) {
      onCloseModalClick();
    }
  }

  // Если есть кнопка для закрытия в шаблоне
  const closeButton = container.querySelector('.error__button') || container.querySelector('.success__button');
  if (closeButton) {
    closeButton.addEventListener('click', onCloseModalClick);
  }
};

// Функция для показа ошибки при отправке формы
const showError = () => {
  showModal('#error');
};

// Функция для показа ошибки при загрузке данных (getData)
const showDataError = () => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const container = template.querySelector('.data-error');
  document.body.append(container);

  // Через 5 секунд убираем
  setTimeout(() => {
    container.remove();
  }, ALERT_SHOW_TIME);
};

// Функция для показа успеха отправки формы
const showSuccess = () => {
  showModal('#success');
};

export { showError, showDataError, showSuccess, isErrorModalOpen };
