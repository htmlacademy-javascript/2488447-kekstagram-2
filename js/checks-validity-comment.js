const MAX_COMMENT_LENGTH = 140;

let commentErrorMessage = '';

const getCommentError = () => commentErrorMessage;

const isCommentValid = (value) => {
  commentErrorMessage = '';

  const inputText = value.trim();

  if (inputText.length === 0) {
    return true;
  }

  if (inputText.length > MAX_COMMENT_LENGTH) {
    commentErrorMessage = `Длина комментария не может превышать ${MAX_COMMENT_LENGTH} символов.`;
    return false;
  }

  return true;
};

export { getCommentError, isCommentValid };
