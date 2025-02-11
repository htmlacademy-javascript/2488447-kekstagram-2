import { getArrayPosts } from './create-array-manifest.js';


import { createMiniatures } from './create-miniatures.js';

createMiniatures(structuredClone(getArrayPosts));
