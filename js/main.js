import { getPictures } from './data.js';
import { addUserImage } from './minimize.js';
import { collectParameters } from './fullscreenPicture.js';

const pictureCollection = getPictures();

collectParameters(pictureCollection);
addUserImage(pictureCollection);
