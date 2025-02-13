import { getArrayPosts } from './create-array-manifest.js';


import { createMiniatures } from './create-miniatures.js';

import './create-big-picture.js';

createMiniatures(structuredClone(getArrayPosts));


