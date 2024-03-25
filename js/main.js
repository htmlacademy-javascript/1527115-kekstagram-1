import { pictureData } from './data.js';
import { addUserImage } from './minimize.js';
import { initListener } from './fullscreen-picture.js';

initListener(pictureData());
addUserImage(pictureData());
