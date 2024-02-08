import {getPictures} from './data.js';

const template = document.querySelector('#picture').content;

const cloneTemplate = (likes, comments, url) => {
  const thumbnail = template.cloneNode(true);

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments;
  thumbnail.querySelector('.picture__img').src = url;

  return thumbnail;
};

const addUserImage = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((element) => {
    const newPictures = cloneTemplate(element.likes, element.comments.length, element.url);
    fragment.append(newPictures);
  });

  return document.querySelector('.pictures').append(fragment);

};

addUserImage(getPictures());
