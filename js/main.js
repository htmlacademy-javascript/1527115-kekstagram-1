import { addUserImage } from './minimize.js';
import { initListener } from './fullscreen-picture.js';
import { setOnFormSubmit } from './form.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import { showAllert } from './util.js';

getData()
  .then((pictures) => {
    addUserImage(pictures);
    initListener(pictures);
  })
  .catch((err) => {
    showAllert(err.message);
  });

setOnFormSubmit();
