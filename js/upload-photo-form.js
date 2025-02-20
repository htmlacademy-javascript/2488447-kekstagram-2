import { isEscapeKey } from './utils.js';
import { error, isHashtagsValid } from './checks-validity-hashtag.js';
import { commentError, isCommentValid } from './checks-validity-comment.js';
import { initEffects, resetEffects } from './effects-overlay.js';
import { initScale, resetScale } from './change-photo-scale.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const pageBody = document.querySelector('body');
const uploadInputElement = uploadFormElement.querySelector('.img-upload__input');
const photoEditorFormElement = uploadFormElement.querySelector('.img-upload__overlay');
const closeFormButton = uploadFormElement.querySelector('.img-upload__cancel');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');
const uploadSubmitElement = uploadFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const closePhotoEditor = () => { //закрытие редактора
  photoEditorFormElement.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  uploadInputElement.value = '';
  resetEffects(); //очищаем эфект
  resetScale(); //очищаем масштаб
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagInputElement || document.activeElement === commentInputElement) {
      evt.stopPropagation();
    } else {
      uploadFormElement.reset();
      closePhotoEditor();
    }
  }
};

const сlosingPhotoEditingForm = () => { // оброботчик события на закрытие редактора
  closeFormButton.addEventListener('click', closePhotoEditor, {once: true});
  document.addEventListener('keydown', onDocumentKeydown, {once: true});
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    uploadFormElement.submit();
  } else {
    // временный вывод в консоль
    // console.error('Форма не прошла валидацию');
  }
};

pristine.addValidator(hashtagInputElement, isHashtagsValid, error);
pristine.addValidator(commentInputElement, isCommentValid, commentError);

const initUploadModal = () => {
  uploadInputElement.addEventListener('change', () => {
    photoEditorFormElement.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    uploadSubmitElement.addEventListener('click', onFormSubmit); // обраотчик события на отправку формы
    сlosingPhotoEditingForm();//функция закрытия редактора
    initScale(); //функция масштабирования фото
    initEffects(); //функция работы с эфектами
  });
};

export { initUploadModal };
