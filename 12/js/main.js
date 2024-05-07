import { addUserImage } from './minimize.js';
import { initListener } from './fullscreen-picture.js';
import { setOnFormSubmit } from './form.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { showFilter, filterButtonToggle } from './filter.js';
import './load-pictures.js';

async function getDataDefault () {
  try {
    const pictures = await getData();
    showFilter();
    filterButtonToggle(pictures);
    addUserImage(pictures);
    initListener(pictures);
  } catch (err) {
    showAlert(err.message);
  }
  setOnFormSubmit();
}

getDataDefault();
