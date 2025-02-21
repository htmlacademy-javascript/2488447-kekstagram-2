import { getError, isHashtagsValid } from './checks-validity-hashtag.js';
import { getCommentError, isCommentValid } from './checks-validity-comment.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
const commentInputElement = uploadFormElement.querySelector('.text__description');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

pristine.addValidator(hashtagInputElement, isHashtagsValid, getError);
pristine.addValidator(commentInputElement, isCommentValid, getCommentError);

export { pristine };
