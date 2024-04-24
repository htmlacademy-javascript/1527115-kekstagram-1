import { imgPreview } from './scale.js';

const EFFECTS = [
  {
    name: 'none',
    style: '',
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let selectedEffect = DEFAULT_EFFECT;

const effects = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelElement = sliderContainer.querySelector('.effect-level__value');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');


const isDefault = () => selectedEffect.name === DEFAULT_EFFECT.name;

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: selectedEffect.max,
    range: {
      'min': selectedEffect.min,
      'max': selectedEffect.max
    },
    step: selectedEffect.step,
    connect: 'lower'
  });

  if (isDefault()) {
    hideSlider();
  } else {
    showSlider();
  }
};

const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  selectedEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imgPreview.style.filter = isDefault()
    ? DEFAULT_EFFECT.style
    : `${selectedEffect.style}(${sliderValue}${selectedEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

const resetEffect = () => {
  selectedEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create (sliderElement, {
  start: 100,
  range: {
    'min': 0,
    'max': 100
  },
  step: 1,
  connect: 'lower'
});

hideSlider();

effects.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffect };
