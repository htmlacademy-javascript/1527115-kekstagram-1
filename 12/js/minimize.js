const templateUserPicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

const generateTemplate = ({likes, comments, url, descriptions, id}) => {
  const thumbnail = templateUserPicture.cloneNode(true);

  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = descriptions;
  thumbnail.dataset.imgId = id;

  return thumbnail;
};

const addUserImage = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((element) => {
    fragment.append(generateTemplate(element));
  });

  pictureContainer.append(fragment);

};

export { addUserImage, pictureContainer };
