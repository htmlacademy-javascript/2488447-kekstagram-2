import { getDataArrayMiniatures } from './data.js';
import { getRandomInteger, getRandomUniqueIdGenerator } from './utils.js';

const TOTAL_POSTS = 25;

const DATA_SET = {
  POST_ID_MIN: 1,
  POST_ID_MAX: 25,
  PHOTO_ID_MIN: 1,
  PHOTO_ID_MAX: 25,
  COMMENT_ID_MIN: 1,
  COMMENT_ID_MAX: 10000,
  LIKES_MIN: 15,
  LIKES_MAX: 200,
  COMMENTS_MIN: 0,
  COMMENTS_MAX: 30,
  AVATARS_MIN: 1,
  AVATARS_MAX: 6,
};

const { DESCRIPTIONS, COMMENTS, NAMES } = getDataArrayMiniatures();

const generatePostId = getRandomUniqueIdGenerator(DATA_SET.POST_ID_MIN, DATA_SET.POST_ID_MAX);
const generatePhotoId = getRandomUniqueIdGenerator(DATA_SET.PHOTO_ID_MIN, DATA_SET.PHOTO_ID_MAX);
const generateCommentId = getRandomUniqueIdGenerator(DATA_SET.COMMENT_ID_MIN, DATA_SET.COMMENT_ID_MAX);

const createComment = () => {
  const avatar = `img/avatar-${getRandomInteger(DATA_SET.AVATARS_MIN, DATA_SET.AVATARS_MAX)}.svg`;
  const commentTextIndex = getRandomInteger(0, COMMENTS.length - 1);
  const nameIndex = getRandomInteger(0, NAMES.length - 1);

  return {
    id: generateCommentId(),
    avatar: avatar,
    comment: COMMENTS[commentTextIndex],
    name: NAMES[nameIndex],
  };
};

const generatePost = () => {
  const photoId = generatePhotoId();
  const postId = generatePostId();
  const photoUrl = `photos/${photoId}.jpg`;
  const likesCount = getRandomInteger(DATA_SET.LIKES_MIN, DATA_SET.LIKES_MAX);
  const commentsCount = getRandomInteger(DATA_SET.COMMENTS_MIN, DATA_SET.COMMENTS_MAX);

  const commentsList = Array.from({ length: commentsCount }, createComment);
  return {
    id: postId,
    photo: photoUrl,
    description: DESCRIPTIONS[photoId - 1],
    likes: likesCount,
    comments: commentsList,
  };
};

const getArrayPosts = Array.from({ length: TOTAL_POSTS }, generatePost);

export { getArrayPosts };
