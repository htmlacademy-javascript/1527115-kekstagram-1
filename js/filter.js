import { addUserImage, pictureContainer } from './minimize.js';
import { debounce } from './util.js';

const PICTURE_COUNTS = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filters = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;

const showFilter = () => {
  filters.classList.remove('img-filters--inactive');
};

const clearPictureContainer = () => {
  pictureContainer.querySelectorAll('.picture').forEach((element) => element.remove());
};

const comparePicture = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getRandomSort = () => Math.random() - 0.5;

const getFilteredPictures = (pictures) => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(getRandomSort).slice(0, PICTURE_COUNTS);
    case Filter.DISCUSSED:
      return [...pictures].sort(comparePicture);
    default:
      return[...pictures];
  }
};

const getFilteredUserImage = (evt, pictures) => {
  if (evt.target.id === currentFilter) {
    return;
  }

  if (evt.target.closest('.img-filters__button')) {
    currentFilter = evt.target.id;
  }
  clearPictureContainer();
  addUserImage(getFilteredPictures(pictures));
};

const togglesButton = (evt) => {
  const sortButton = document.querySelector('.img-filters__button--active');

  if (evt.target.closest('.img-filters__button')) {
    sortButton.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const filterButtonToggle = (pictures) => {
  filters.addEventListener('click', debounce((evt) => getFilteredUserImage(evt, pictures)));
  filters.addEventListener('click', (evt) => togglesButton(evt));
};

export { showFilter, filterButtonToggle };
