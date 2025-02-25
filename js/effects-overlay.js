import { EFFECTS } from './data.js';

const imgElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectLevelValue = sliderContainer.querySelector('.effect-level__value');

const HIDDEN_CLASS = 'hidden';

let currentEffect = EFFECTS.none;

// Применяем CSS-фильтр к фото
const applyEffect = (value) => {
  if (currentEffect.name === 'none') {
    imgElement.style.filter = 'none';
    return;
  }
  imgElement.style.filter = `${currentEffect.style}(${value}${currentEffect.unit})`;
};

// Инициализируем noUiSlider, задаем диапазон значений, начальное значение и шаг.
const initSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: currentEffect.min,
      max: currentEffect.max
    },
    start: currentEffect.start,
    step: currentEffect.step,
    connect: 'lower'
  });

  // Слушаем событие обновления слайдера
  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    let formattedValue;
    if (Number.isInteger(parseFloat(value))) {
      formattedValue = parseFloat(value).toString(); // Преобразуем в строку без дробной части
    } else {
      formattedValue = parseFloat(value).toFixed(1); // Округляем до одного знака после запятой
    }
    effectLevelValue.setAttribute('value', formattedValue);
    applyEffect(formattedValue);
  });
};

//обновляем параметры слайдера в зависимости от выбранного эффекта.
const updateSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.start,
    step: effect.step
  });
};

// Обработка изменения эффекта
const onEffectChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  // Если выбрали «none» — прячем слайдер, убираем filter
  if (currentEffect.name === 'none') {
    sliderContainer.classList.add(HIDDEN_CLASS);
    imgElement.style.filter = 'none';
    effectLevelValue.setAttribute('value', '');
  } else {
    sliderContainer.classList.remove(HIDDEN_CLASS);
    updateSliderOptions(currentEffect);
  }
};

// Сброс эфекта
const resetEffects = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  effectsListElement.removeEventListener('change', onEffectChange);

  currentEffect = EFFECTS.none;
  imgElement.style.filter = 'none';
  effectLevelValue.setAttribute('value', '');
  sliderContainer.classList.add(HIDDEN_CLASS);
};

const initEffects = () => {
  sliderContainer.classList.add(HIDDEN_CLASS);
  initSlider();
  effectsListElement.addEventListener('change', onEffectChange);
};

export { initEffects, resetEffects };
