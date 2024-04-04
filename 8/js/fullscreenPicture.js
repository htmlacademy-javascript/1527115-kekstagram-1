const fullscreenPicture = document.querySelector('.big-picture');
const pictureContainer = document.querySelector('.pictures');
const closedPopup = fullscreenPicture.querySelector('.big-picture__cancel');
const bigPicture = fullscreenPicture.querySelector('.big-picture__img');
const pictureSocial = fullscreenPicture.querySelector('.big-picture__social');
const likesCount = pictureSocial.querySelector('.likes-count');
const commentCount = pictureSocial.querySelector('.comments-count');
const socialCommentList = document.querySelector('.social__comments');
const socialComment = document.querySelectorAll('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');

const addSocialComments = (comments) => {
  socialCommentList.innerHTML = '';

  for (let i = 0; i < comments.length; i++) {
    const cloneComment = socialComment[0].cloneNode(true);

    cloneComment.querySelector('.social__picture').src = comments[i].avatar;
    cloneComment.querySelector('.social__picture').alt = comments[i].name;
    cloneComment.querySelector('.social__text').textContent = comments[i].message.keys().next().value;
    socialCommentList.appendChild(cloneComment);
  }
};

const addPictureParameters = ({ likes, comments, url, descriptions }) => {
  bigPicture.children[0].src = url;
  bigPicture.children[0].alt = descriptions;
  pictureSocial.querySelector('.social__caption').textContent = descriptions;
  likesCount.textContent = likes;
  commentCount.textContent = comments.length;

  addSocialComments(comments);
};

const collectParameters = (picture) => {
  pictureContainer.addEventListener('click', (evt) => {

    if (evt.target.nodeName === 'IMG') {
      for (let i = 0; i < 25; i++) {
        if (pictureContainer.querySelectorAll('.picture__img')[i].src === evt.target.src) {
          addPictureParameters(picture[i]);
        }
      }

      fullscreenPicture.classList.remove('hidden');
      socialCommentCount.classList.add('hidden');
      commentsLoader.classList.add('hidden');
      body.classList.add('modal-open');
    }

    closedPopup.addEventListener('click', () => {
      fullscreenPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    });

  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      fullscreenPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });

};

export { collectParameters };
