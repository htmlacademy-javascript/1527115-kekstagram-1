const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
let scale = 100;

const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');

const scaleImage = (value) => {
  scaleValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${1 * value / 100})`;
};

const inScaleSmaller = () => {
  scale -= STEP_SCALE;
  if (scale < MIN_SCALE) {
    scale = MIN_SCALE;
  }
  scaleImage(scale);
};

const inScaleBigger = () => {
  scale += STEP_SCALE;
  if (scale > MAX_SCALE) {
    scale = MAX_SCALE;
  }
  scaleImage(scale);
};

const resetScale = () => {
  scale = 100;
  imgPreview.style.transform = 'scale(1)';
};

buttonScaleSmaller.addEventListener('click', inScaleSmaller);
buttonScaleBigger.addEventListener('click', inScaleBigger);

export { imgPreview, resetScale };
