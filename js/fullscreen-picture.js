import { pictureCollections } from './data.js';
import {
  isEscapeKey,
  bodyEl
} from './util.js';

const fullscreenPicture = document.querySelector('.big-picture');
const pictureContainer = document.querySelector('.pictures');
const closedPopup = fullscreenPicture.querySelector('.big-picture__cancel');
const bigPicture = fullscreenPicture.querySelector('.big-picture__img');
const pictureSocial = fullscreenPicture.querySelector('.big-picture__social');
const likesCount = pictureSocial.querySelector('.likes-count');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = socialCommentList.querySelectorAll('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsShown = socialCommentCount.querySelector('.comments-shown');
const commentCount = socialCommentCount.querySelector('.comments-count');
const commentsLoaderButton = document.querySelector('.comments-loader');
let commentsCounter = 5;

const commentsHidden = () => {
  const currentComments = socialCommentList.querySelectorAll('.social__comment');
  if (currentComments.length <= commentsCounter) {
    commentsLoaderButton.classList.add('hidden');
    commentsCounter = currentComments.length;
    commentsShown.textContent = commentsCounter;
    commentCount.textContent = commentsCounter;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  const newCurrentComments = Array.from(currentComments).slice(0, commentsCounter);
  newCurrentComments.forEach((element) => element.classList.remove('hidden'));

  return newCurrentComments.length;
};

const onLoaderButtonClick = (evt) => {
  evt.preventDefault();
  commentsCounter += 5;
  commentsShown.textContent = commentsCounter;
  commentsHidden();
};

const commentsLoader = () => {
  commentsLoaderButton.addEventListener ('click', onLoaderButtonClick);
};

const addSocialComments = (comments) => {
  socialCommentList.innerHTML = '';
  comments.forEach((comment) => {
    const cloneComment = socialComment[0].cloneNode(true);
    cloneComment.classList.add('hidden');
    cloneComment.querySelector('.social__picture').src = comment.avatar;
    cloneComment.querySelector('.social__picture').alt = comment.name;
    cloneComment.querySelector('.social__text').textContent = '';
    comment.message.forEach((element) => {
      cloneComment.querySelector('.social__text').textContent += `${element} `;
    });
    socialCommentList.appendChild(cloneComment);
  });

  commentsLoader();
  commentsHidden();
};

const addPictureParameters = ({ likes, comments, url, descriptions }) => {
  bigPicture.querySelector('img').src = url;
  bigPicture.querySelector('img').alt = descriptions;
  pictureSocial.querySelector('.social__caption').textContent = descriptions;
  likesCount.textContent = likes;
  commentsShown.textContent = commentsCounter;
  commentCount.textContent = comments.length;

  addSocialComments(comments);
};

const hideModal = () => {
  fullscreenPicture.classList.add('hidden');
  bodyEl.classList.remove('modal-open');
  commentsCounter = 5;
  document.removeEventListener('keydown', onModalEscKeydown);
  closedPopup.removeEventListener('click', hideModal);
};

const showModal = () => {
  fullscreenPicture.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  document.addEventListener('keydown', onModalEscKeydown);
  closedPopup.addEventListener('click', hideModal);
};

function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    hideModal();
  }
}

const initListener = () => {
  pictureContainer.addEventListener('click', (evt) => {
    const changedElement = evt.target.closest('.picture');
    if (changedElement) {
      const pictureDataId = pictureCollections.find(
        (item) => item.id === +changedElement.dataset.imgId
      );
      addPictureParameters(pictureDataId);
      showModal();
    }
  });
};

// initListener(pictureData());

export { initListener };
