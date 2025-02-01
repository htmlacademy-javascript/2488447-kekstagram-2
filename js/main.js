const TOTAL_POSTS = 25;

const DESCRIPTIONS = [
  'Вид на озеро при отеле.',
  'Указатель ведущий к пляжу.',
  'Вид на пляж и лазурный океан.',
  'Маша на берегу океана.',
  'Весёлый обед.',
  'Спортивный автомобиль моей мечты.',
  'Клубничный завтрак.',
  'Прохладный морс из свежей смородины.',
  'Удачное фото на берегу океана с пролетающим кукурузником.',
  'Коллекция летней обуви.',
  'Тропа к океану.',
  'Белая ауди.',
  'На ужин: мясо с овощами.',
  'Суши-котик.',
  'Тапки железного человека.',
  'Вид с борта самолёта.',
  'Выступление хора.',
  'Ретро автомобиль.',
  'Очень удобные тапочки с подстветкой.',
  'Отель в восточных масивах среди высоких пальм.',
  'Пэпэшный обед.',
  'Незабываем закат на берегу океана.',
  'Краб сухопутный тритаился.',
  'Концерт любомого исполнителя.',
  'Бегемот хотел нас съесть'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Дарья',
  'Артём',
  'Ольга',
  'Алексей',
  'Александр',
  'Гульнара',
  'Дмитрий',
  'Еремей',
  'Тимофей',
  'Кутуп',
  'Полина',
  'Валерия',
  'Клавдия',
  'Патрик',
  'Адам',
  'Ева',
  'Маргарита',
  'Есения',
  'Мира',
  'Екатерина',
  'Мария',
  'Юлия',
  'Оксана',
  'Михаил',
  'Клементий'
];

const getRandomInteger = (min, max) => {
  const lowerBound = Math.ceil(Math.min(min, max));
  const upperBound = Math.floor(Math.max(min, max));
  const randomValue = Math.random() * (upperBound - lowerBound + 1) + lowerBound;
  return Math.floor(randomValue);
};

const getRandomUniqueIdGenerator = (min, max) => {
  const usedIds = [];

  return () => {
    let newId = getRandomInteger(min, max);
    if (usedIds.length >= (max - min + 1)) {
      console.error(`Все числа в диапазоне от ${min} до ${max} были использованы.`);
      return null;
    }
    while (usedIds.includes(newId)) {
      newId = getRandomInteger(min, max);
    }
    usedIds.push(newId);
    return newId;
  };
};

const generatePostId = getRandomUniqueIdGenerator(1, 25);
const generatePhotoId = getRandomUniqueIdGenerator(1, 25);
const generateCommentId = getRandomUniqueIdGenerator(1, 10000);

const createComment = () => {
  const avatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
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
  const likesCount = getRandomInteger(15, 200);
  const commentsCount = getRandomInteger(0, 30);

  const commentsList = Array.from({ length: commentsCount }, createComment);
  return {
    id: postId,
    photo: photoUrl,
    description: DESCRIPTIONS[photoId - 1],
    likes: likesCount,
    comments: commentsList,
  };
};

const posts = Array.from({ length: TOTAL_POSTS }, generatePost);

console.log(posts);

