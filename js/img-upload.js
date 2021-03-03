import { BODY } from './constants.js';
import { isEscEvent } from './util.js'

const imgUpload = document.querySelector('.img-upload__overlay');
const close = document.querySelector('#upload-cancel');
const uploadControl = document.querySelector('.img-upload__input')

// Открытие/Закрытие модалки п.1-2

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onModalCloseClick = (evt) => {
  evt.preventDefault();
  closeModal();
};

const openModal = () => {
  imgUpload.classList.remove('hidden');
  BODY.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  close.addEventListener('click', onModalCloseClick);
};

const closeModal = () => {
  imgUpload.classList.add('hidden');
  BODY.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
  close.removeEventListener('click', onModalCloseClick);
};

uploadControl.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

close.addEventListener('click', () => {
  closeModal();
});

openModal();


//кнопки увеличения п.3
//после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;

const controlSmaller = document.querySelector('.scale__control--smaller'); // меньше
const controlBigger = document.querySelector('.scale__control--bigger'); // больше
let controlValue = document.querySelector('.scale__control--value'); //показывает значение
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img'); //фото

let photoSize = 100;
const MIN_PHOTO_SIZE = 25;
const MAX_PHOTO_SIZE = 100;

controlSmaller.addEventListener('click', () => {
  if (photoSize > MIN_PHOTO_SIZE) {
    photoSize -= 25;
    photoPreview.style.transform = `scale(0.${photoSize})`;
  }
  controlValue.value = `${photoSize}%`;

});

controlBigger.addEventListener('click', () => {
  if (photoSize < MAX_PHOTO_SIZE) {
    photoSize += 25;
    photoPreview.style.transform = `scale(0.${photoSize})`;
  }
  if (photoSize == MAX_PHOTO_SIZE) {
    photoPreview.style.transform = 'scale(1)';
  }
  controlValue.value = `${photoSize}%`;
});


//слайдер п.4

const slider = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
effectLevel.classList.add('hidden');
effectLevelValue.value = '';


noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

slider.noUiSlider.on('update', (values, handle) => {
  effectLevelValue.value = values[handle];
});


//Original
effectNone.addEventListener('click', () => {
  photoPreview.classList.add('effects__preview--none');
  effectLevel.classList.add('hidden');
  photoPreview.style.filter = 'none';
});

//Chrome
effectChrome.addEventListener('click', () => {
  photoPreview.classList.add('effects__preview--chrome');
  effectLevel.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });


  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    photoPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  });

});

//Sepia
effectSepia.addEventListener('click', () => {
  photoPreview.classList.add('effects__preview--sepia');
  effectLevel.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });


  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    photoPreview.style.filter = `sepia(${effectLevelValue.value})`;
  });

});

//Marvin
effectMarvin.addEventListener('click', () => {
  photoPreview.classList.add('effects__preview--marvin');
  effectLevel.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  });


  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    photoPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  });

});

//Phobos
effectPhobos.addEventListener('click', () => {
  photoPreview.classList.add('effects__preview--phobos');
  effectLevel.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });


  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    photoPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  });

});

//Heat
effectHeat.addEventListener('click', () => {
  photoPreview.classList.add('effects__preview--heat');
  effectLevel.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });


  slider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    photoPreview.style.filter = `brightness(${effectLevelValue.value})`;
  });

});
