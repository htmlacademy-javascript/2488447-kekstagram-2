import { isEscapeKey } from './utils.js';
import { initEffects, resetEffects } from './effects-overlay.js';
import { initScale, resetScale } from './change-photo-scale.js';
import { submitButtonTexts} from './data.js';
import { sendData } from './api.js';
import { showError, showSuccess, isErrorModalOpen } from './show-alerts.js';
import { pristine } from './checking-validity-all-input.js';

const pageBody = document.querySelector('body');
const uploadFormElement = pageBody.querySelector('.img-upload__form');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const photoEditorFormElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeFormButton = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const uploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');
const previewImgElement = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');


// Проверяем, не находится ли фокус в полях ввода
const isInputFocused = () => document.activeElement === hashtagInputElement || document.activeElement === commentInputElement;

// если поля в фокусе убираем возмодность закрыть форму
const onDataInputsKeydown = (evt) => {
  if (isEscapeKey(evt) && isInputFocused()) {
    evt.stopPropagation();
  }
};

// если поля вне фокуса форму можно закрыть через esc
const onEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputFocused() && !isErrorModalOpen) {
    evt.preventDefault();
    closePhotoEditor();
  }
};

// блокировка кнопки отправки
const blockSubmitButton = () => {
  uploadSubmitElement.disabled = true;
  uploadSubmitElement.textContent = submitButtonTexts.SENDING;
};

// разблокировка кнопки отправки
const unblockSubmitButton = () => {
  uploadSubmitElement.disabled = false;
  uploadSubmitElement.textContent = submitButtonTexts.IDLE;
};

// удаляем слушатели событий
const removeEventListeners = () => {
  closeFormButton.removeEventListener('click', closePhotoEditor);
  document.removeEventListener('keydown', onEscKeydown);
  hashtagInputElement.removeEventListener('keydown', onDataInputsKeydown);
  commentInputElement.removeEventListener('keydown', onDataInputsKeydown);
  uploadFormElement.removeEventListener('submit', onFormSubmit);
};

// добавляем слушатели событий
const addEventListeners = () => {
  closeFormButton.addEventListener('click', closePhotoEditor);
  document.addEventListener('keydown', onEscKeydown);
  hashtagInputElement.addEventListener('keydown', onDataInputsKeydown);
  commentInputElement.addEventListener('keydown', onDataInputsKeydown);
  uploadFormElement.addEventListener('submit', onFormSubmit);
};

// функция закрытия формы
function closePhotoEditor() {
  pristine.reset();
  uploadFormElement.reset();
  uploadInputElement.value = '';
  resetEffects();
  resetScale();
  photoEditorFormElement.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  removeEventListeners();
}

// функция открытия формы
const openPhotoEditor = () => {
  previewImgElement.src = '';

  const file = uploadInputElement.files?.[0];
  if (!file) {
    return;
  }

  const imageURL = URL.createObjectURL(file); //создаем временный URL для загруженного файла
  previewImgElement.src = imageURL;
  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageURL})`; // подставляем загруженное фото в превью с эфектами
  });

  window.addEventListener('load', () => { // освобождаем ресурсы
    URL.revokeObjectURL(imageURL);
  }, { once: true });
  photoEditorFormElement.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  initScale();
  initEffects();
  addEventListeners();
};

// функция отправки данных
async function onFormSubmit(evt) {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  blockSubmitButton();
  const formData = new FormData(uploadFormElement);

  try {
    await sendData(formData);
    closePhotoEditor();
    showSuccess();
  } catch (err) {
    showError();
  } finally {
    unblockSubmitButton();
  }
}

const setUploadForm = () => {
  uploadInputElement.addEventListener('change', openPhotoEditor);
};

export { setUploadForm };
