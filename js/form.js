import {
  isEscapeKey,
  bodyEl
} from './util.js';
import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';

const VALID_HASHTEG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
let textError = 'Текст ошибки';

const form = document.querySelector('.img-upload__form');
const fileField = document.querySelector('.img-upload__start');
const uploadImageModal = form.querySelector('.img-upload__overlay');
const modalClosedButton = uploadImageModal.querySelector('#upload-cancel');
const fieldHashteg = uploadImageModal.querySelector('.text__hashtags');
const fieldComment = uploadImageModal.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showModal = () => {
  uploadImageModal.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffect();
  resetScale();
  uploadImageModal.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  document.removeEventListener('keydown', onModalEscKeydown);
};

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () => {
  showModal();
};

function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    if(document.activeElement === fieldHashteg || document.activeElement === fieldComment) {
      return;
    }
    evt.preventDefault();
    hideModal();
  }
}

const isValidTag = (tag) => VALID_HASHTEG.test(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(' ').filter((tag) => tag.length !== 0);
  switch(false) {
    case hasUniqueTags(tags):
      textError = 'Хэштеги не должны повторяться';
      return false;
    case hasValidCount(tags):
      textError = 'Укажите не более 5 хэштегов';
      return false;
    case tags.every(isValidTag):
      textError = 'Хэштег должен начинаться с # и ссотоять из букв и/или цифр';
      return false;
    default:
      return true;
  }
};

const getTextError = () => textError;

pristine.addValidator (
  fieldHashteg,
  validateTags,
  getTextError
);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    pristine.validate();
  }
};

fileField.addEventListener('change', onFileInputChange);
modalClosedButton.addEventListener('click', onCancelButtonClick);
form.addEventListener('submit', onFormSubmit);
