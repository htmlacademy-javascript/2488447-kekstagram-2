import { createMiniatures } from './create-miniatures.js';
import { setUploadForm } from './upload-photo-form.js';
import { getData } from './api.js';
import { showDataError } from './show-alerts.js';
import { initFilters } from './sort-filters.js';
import { debounce } from './utils.js';

const initApp = async () => {
  setUploadForm();
  try {
    const data = await getData();
    const container = document.querySelector('.pictures');
    const uploadForm = container.querySelector('.img-upload');
    const debouncedRender = debounce((filteredPhotos) => {
      container.innerHTML = '';
      if (uploadForm) {
        container.append(uploadForm);
      }
      createMiniatures(container, filteredPhotos);
    });

    initFilters(data, debouncedRender);
    createMiniatures(container, data);

  } catch (error) {
    showDataError();
  }
};

initApp();


