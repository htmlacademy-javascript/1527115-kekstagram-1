import { pictureData } from './data.js';
import { isEscapeKey } from './util.js';

const fullscreenPicture = document.querySelector('.big-picture');
const pictureContainer = document.querySelector('.pictures');
const closedPopup = fullscreenPicture.querySelector('.big-picture__cancel');
const bigPicture = fullscreenPicture.querySelector('.big-picture__img');
const pictureSocial = fullscreenPicture.querySelector('.big-picture__social');
const likesCount = pictureSocial.querySelector('.likes-count');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = socialCommentList.querySelectorAll('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');
const body = document.querySelector('body');
let commentsCounter = 5;

const commentsHidden = () => {
  const currentComments = socialCommentList.querySelectorAll('.social__comment');
  if (currentComments.length <= commentsCounter) {
    commentsLoaderButton.classList.add('hidden');
    commentsCounter = currentComments.length;
    socialCommentCount.innerHTML = `${commentsCounter} из <span class="comments-count"> ${commentsCounter} </span> комментариев`;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  currentComments.forEach((el) => {
    el.classList.remove('hidden');
  });

  for (let i = commentsCounter; i < currentComments.length; i++) {
    currentComments[i].classList.add('hidden');
  }

  return currentComments.length;
};

const onLoaderButtonClick = (evt) => {
  evt.preventDefault();
  commentsCounter += 5;
  commentsHidden();
  socialCommentCount.innerHTML = `${commentsCounter} из <span class="comments-count"> ${commentsHidden()} </span> комментариев`;
};

const commentsLoader = () => {
  commentsLoaderButton.addEventListener ('click', onLoaderButtonClick);
};

const addSocialComments = (comments) => {
  socialCommentList.innerHTML = '';
  comments.forEach((comment) => {
    const cloneComment = socialComment[0].cloneNode(true);
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
  socialCommentCount.innerHTML = `${commentsCounter} из <span class="comments-count">${comments.length}</span> комментариев`;

  addSocialComments(comments);
};

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    fullscreenPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsCounter = 5;
  }
};

const initListener = () => {
  pictureContainer.addEventListener('click', (evt) => {
    if (evt.target.nodeName === 'IMG') {
      const pictureDataId = pictureData().find(
        (item) => item.id === +evt.target.closest('.picture').dataset.imgId
      );
      addPictureParameters(pictureDataId);

      fullscreenPicture.classList.remove('hidden');
      body.classList.add('modal-open');
    }

    closedPopup.addEventListener('click', () => {
      fullscreenPicture.classList.add('hidden');
      body.classList.remove('modal-open');
      commentsCounter = 5;
      commentsLoaderButton.removeEventListener ('click', onLoaderButtonClick);
    });

  });

  document.addEventListener('keydown', onModalEscKeydown);
};

// initListener(pictureData());

export { initListener };
