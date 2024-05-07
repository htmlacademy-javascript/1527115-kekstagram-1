import { addUserImage } from './minimize.js';
import { initListener } from './fullscreen-picture.js';
import { setOnFormSubmit } from './form.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import { showalert } from './util.js';
import { showFilter, filterButtonToggle } from './filter.js';

const getDataDefault = () => {
  getData()
    .then((pictures) => {
      showFilter();
      filterButtonToggle(pictures);
      addUserImage(pictures);
      initListener(pictures);
    })
    .catch((err) => {
      showalert(err.message);
    })
    .finally(setOnFormSubmit());
};

getDataDefault();

export {getDataDefault};
