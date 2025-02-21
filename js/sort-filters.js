import { Filters, RANDOM_PHOTO_MAX } from './data.js';
import { shuffleArray, debounce } from './utils.js';

const filtersContainer = document.querySelector('.img-filters');
const filtersFormElement = filtersContainer.querySelector('.img-filters__form');
const filtersButtons = filtersFormElement.querySelectorAll('.img-filters__button');

const getFilteredPhotos = (photos, filterType) => {
  switch (filterType) {

    case Filters.DEFAULT:
      return [...photos];

    case Filters.RANDOM:
    {
      const shuffled = shuffleArray([...photos]);
      return shuffled.slice(0, RANDOM_PHOTO_MAX);
    }

    case Filters.DISCUSSED:
      return [...photos].sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);

      //обеспечивает возврат исходного массива, если фильтр не распознан.
    default:
      return [...photos];
  }
};

const initFilters = (photos, cb) => {
  filtersContainer.classList.remove('img-filters--inactive');

  filtersFormElement.addEventListener('click', debounce((evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    filtersButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');


    const filterType = evt.target.id;


    const filtered = getFilteredPhotos(photos, filterType);

    // Передаём в колбэк, который отрисовывает миниатюры
    cb(filtered);
  }));
};

export { initFilters };
