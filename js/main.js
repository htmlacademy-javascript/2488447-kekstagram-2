import { getArrayPosts } from './create-array-manifest.js';


import { createMiniatures } from './create-miniatures.js';

import { initUploadModal } from './upload-photo-form.js';

initUploadModal();


createMiniatures(structuredClone(getArrayPosts));


