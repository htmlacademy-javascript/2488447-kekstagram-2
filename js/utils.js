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

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomUniqueIdGenerator, isEscapeKey };
