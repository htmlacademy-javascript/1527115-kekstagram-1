import { pictureCollections } from './data.js';
import { addUserImage } from './minimize.js';
import { initListener } from './fullscreen-picture.js';
import './form.js';

initListener(pictureCollections);
addUserImage(pictureCollections);
