import {
  isEscapeKey,
  bodyEl
} from './util.js';
import { resetEffect } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';

const VALID_HASHTEG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
let textError = 'Текст ошибки';
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Загрузка...'
};

const form = document.querySelector('.img-upload__form');
const fileField = document.querySelector('.img-upload__start');
const uploadImageModalElement = form.querySelector('.img-upload__overlay');
const modalClosedButton = uploadImageModalElement.querySelector('#upload-cancel');
const fieldHashteg = uploadImageModalElement.querySelector('.text__hashtags');
const fieldComment = uploadImageModalElement.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const templateSuccessMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const templateErrorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');
const template = templateSuccessMessage.cloneNode(true);
const templateClassName = template.className;
const templateError = templateErrorMessage.cloneNode(true);
const templateErrorClassName = templateError.className;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const showModal = () => {
  uploadImageModalElement.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
};

const hideModal = () => {
  form.reset();
  pristine.reset();
  resetEffect();
  resetScale();
  uploadImageModalElement.classList.add('hidden');
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
    if(
      document.activeElement === fieldHashteg ||
      document.activeElement === fieldComment ||
      templateError.className === 'error'
    ) {
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

const createMessage = (element) => {
  element.classList = 'hidden';
  bodyEl.append(element);
};

const showErrorMessage = () => {
  document.addEventListener('keydown', onMessageEscKeydown);
  isErrorMessageUnfocus();
  templateError.classList = templateErrorClassName;
};

const hideErrorMessage = () => {
  document.removeEventListener('keydown', onMessageEscKeydown);
  templateError.classList = 'hidden';
};

function isErrorMessageUnfocus () {
  templateError.addEventListener('click', (evt) => {
    if (evt.target.closest('.error__inner') !== templateError.querySelector('.error__inner')) {
      hideErrorMessage();
    }
  });
}

const showSuccessMessage = () => {
  document.addEventListener('keydown', onMessageEscKeydown);
  successMessageUnfocus();
  template.classList = templateClassName;
};

const hideSuccessMessage = () => {
  template.classList = 'hidden';
  template.removeEventListener('click', onHideSuccessMessage);
};

const onHideMessage = () => {
  hideSuccessMessage();
};

function onHideSuccessMessage (evt) {
  if (evt.target.closest('.success__inner') !== template.querySelector('.success__inner')) {
    hideSuccessMessage();
  }
}

function onMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    hideSuccessMessage();
    hideErrorMessage();
  }
}

function successMessageUnfocus () {
  template.addEventListener('click', onHideSuccessMessage);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const getSuccessMessages = () => {
  createMessage(template);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onHideMessage);
};

const getErrorMessage = () => {
  createMessage(templateError);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', hideErrorMessage);
};

const onValidate = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(hideModal)
      .then(getSuccessMessages)
      .then(showSuccessMessage)
      .catch(() => {
        getErrorMessage();
        showErrorMessage();
      })
      .finally(() => {
        unblockSubmitButton();
      });
  }
};

const setOnFormSubmit = () => {
  form.addEventListener('submit', onValidate);
};

fileField.addEventListener('change', onFileInputChange);
modalClosedButton.addEventListener('click', onCancelButtonClick);

export { setOnFormSubmit };
