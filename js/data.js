export const EFFECTS = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  },
};

export const submitButtonTexts = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЮ...'
};

export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

export const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

export const ALERT_SHOW_TIME = 5000;

export const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED:'filter-discussed'
};

export const RANDOM_PHOTO_MAX = 10;

export const DEBOUNCE_TIME = 500;

