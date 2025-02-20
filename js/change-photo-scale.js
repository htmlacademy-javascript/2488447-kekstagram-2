const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imgElement = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

// Храним текущее значение масштаба (число)
let currentScale = SCALE_DEFAULT; // 100

// Функция, чтобы отобразить scale в интерфейсе
const updateScale = () => {
  scaleValueInput.value = `${currentScale}%`;
  imgElement.style.transform = `scale(${currentScale / 100})`;
};

// Уменьшаем масштаб
const onMinusButtonClick = () => {
  currentScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
  updateScale();
};

// Увеличиваем масштаб
const onPlusButtonClick = () => {
  currentScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
  updateScale();
};

// Сброс настроек маштабирования
const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale();
};

const initScale = () => {
  smallerButtonElement.addEventListener('click', onMinusButtonClick);
  biggerButtonElement.addEventListener('click', onPlusButtonClick);
  updateScale();
};

export { initScale, resetScale };
