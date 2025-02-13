import {isEscapeKey} from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const socialCommentsElement = bigPictureElement.querySelector('.social__comments');
const socialCaptionElement = bigPictureElement.querySelector('.social__caption');
const closeButton = bigPictureElement.querySelector('#picture-cancel');

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeyPress = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const closingEventsPhoto = () => {
  closeButton.addEventListener('click', closeBigPicture, {once: true});
  document.addEventListener('keydown', onEscKeyPress, {once: true});
};

const clearComments = () => {
  socialCommentsElement.innerHTML = '';
};

const addDataToPhoto = (data) => {
  bigPictureImg.src = data.photo;
  bigPictureImg.alt = data.description;
  likesCountElement.textContent = data.likes;
  commentShownCountElement.textContent = 0; // пока не показываем
  commentTotalCountElement.textContent = data.comments.length;
  socialCaptionElement.textContent = data.description;
};

const renderСomment = (comment) => {
  const commentTemplateElement = document. querySelector('#data-comment').content.querySelector('.social__comment');
  const newCommentElement = commentTemplateElement.cloneNode(true);
  const imgComment = newCommentElement.querySelector('.social__picture');
  const textComment = newCommentElement.querySelector('.social__text');

  imgComment.src = comment.avatar;
  imgComment.alt = comment.name;
  textComment.textContent = comment.comment;

  return newCommentElement;
};

const renderСomments = (commentsData) => {
  commentsData.forEach((comment) => {
    bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

    const commentElement = renderСomment(comment);
    socialCommentsElement.appendChild(commentElement);
  });
};

const openBigPhoto = (picture) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closingEventsPhoto();
  addDataToPhoto(picture);
  clearComments();
  renderСomments(picture.comments);
};

export { openBigPhoto };
