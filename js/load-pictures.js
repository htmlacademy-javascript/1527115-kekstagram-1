const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const picturePreview = document.querySelector('.img-upload__preview img');

const uploadingFile = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      picturePreview.src = URL.createObjectURL(file);
    }
  });
  // cb();
};

export { uploadingFile };
