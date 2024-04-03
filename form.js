import { isEscapeKey, body } from './util.js';

const VALID_HASHTEG = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Неверно указаны хэштеги';
const MAX_HASHTAG_COUNT = 5;

const form = document.querySelector('.img-upload__form');
const uploadImage = document.querySelector('#upload-select-image');
const uploadImageModal = document.querySelector('.img-upload__overlay');
const modalClosedButton = uploadImageModal.querySelector('#upload-cancel');
const fieldHashteg = document.querySelector('.text__hashtags');
const fieldComment = document.querySelector('.text__description');

const showModal = () => {
  uploadImageModal.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const hideModal = () => {
  form.reset();
  // pristine.reset();
  uploadImageModal.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

fieldHashteg.addEventListener ('focus', () => {
  document.removeEventListener('keydown', onModalEscKeydown);
});

fieldHashteg.addEventListener ('blur', () => {
  document.addEventListener('keydown', onModalEscKeydown);
});

fieldComment.addEventListener ('focus', () => {
  document.removeEventListener('keydown', onModalEscKeydown);
});

fieldComment.addEventListener ('blur', () => {
  document.addEventListener('keydown', onModalEscKeydown);
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const isValidTag = (tag) => VALID_HASHTEG.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator (
  fieldHashteg,
  validateTags,
  TAG_ERROR_TEXT
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadImage.addEventListener('change', onFileInputChange);
modalClosedButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
