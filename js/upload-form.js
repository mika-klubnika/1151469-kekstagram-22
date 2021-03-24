/* global noUiSlider:readonly */
import {
  createOnModalEscKeydown,
  creteOnModalCloseClick
} from './util.js';
import { uploadForm } from './sending-form.js';
import {
  STEP_SIZE_PHOTO,
  MIN_PHOTO_SIZE,
  MAX_PHOTO_SIZE
} from './constants.js';

const imgEdit = document.querySelector('.img-upload__overlay');
const close = document.querySelector('#upload-cancel');
const downloadButton = document.querySelector('.img-upload__input');

const photoSizeButton = document.querySelector('.img-upload__scale');
const controlValue = document.querySelector('.scale__control--value');
const photoPreview = document.querySelector('.img-upload__preview').querySelector('img');

let photoSize = 100;

const slider = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const SLIDER_OPTIONS = {
  none: {
    options: {},
    effect: 'none',
    measurement: '',
  },
  chrome: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'grayscale',
    measurement: '',
  },
  sepia: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    effect: 'sepia',
    measurement: '',
  },
  marvin: {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    effect: 'invert',
    measurement: '%',
  },
  phobos: {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'blur',
    measurement: 'px',
  },
  heat: {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    effect: 'brightness',
    measurement: '',
  },
};

//восстанавливает форму по умолчанию
const restoreDefault = () => {
  const inputs = [...uploadForm.querySelectorAll('.input-invalid')]

  photoPreview.style = {};
  photoPreview.className = '';
  photoSize = 100;

  inputs.forEach(input => input.classList.remove('input-invalid'))
  uploadForm.reset();
};

//Открыть/Закрыть форму редактирования
const openModal = () => {
  effectLevel.classList.add('hidden');

  imgEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  close.addEventListener('click', onModalCloseClick);

};

const closeModal = () => {
  imgEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');

  restoreDefault();

  document.removeEventListener('keydown', onModalEscKeydown);
  close.removeEventListener('click', onModalCloseClick);
};

const onModalEscKeydown = createOnModalEscKeydown(closeModal);
const onModalCloseClick = creteOnModalCloseClick(closeModal);


downloadButton.addEventListener('change', (evt) => {
  evt.preventDefault();
  openModal();
});

//Уменьшить/Увеличить изображение
const reducesSizeImg = () => {
  if (photoSize > MIN_PHOTO_SIZE) {
    photoSize -= STEP_SIZE_PHOTO;
    photoPreview.style.transform = `scale(0.${photoSize})`;
  }
  controlValue.value = `${photoSize}%`;
}

const increasesSizeImg = () => {
  if (photoSize < MAX_PHOTO_SIZE) {
    photoSize += STEP_SIZE_PHOTO;
    photoPreview.style.transform = `scale(0.${photoSize})`;
  }
  if (photoSize === MAX_PHOTO_SIZE) {
    photoPreview.style.transform = 'scale(1)';
  }
  controlValue.value = `${photoSize}%`;
}

photoSizeButton.addEventListener('click', (evt) => {
  const className = evt.target.classList[1];
  if (className === 'scale__control--smaller') {
    reducesSizeImg()
  }
  if (className === 'scale__control--bigger') {
    increasesSizeImg()
  }
});

//Эффекты для изображения
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

effectList.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'SPAN') {
    const className = evt.target.classList[1];
    const modifier = className.split('--')[1];
    const isModifierNone = modifier === 'none';
    const filter = SLIDER_OPTIONS[modifier];

    photoPreview.className = '';
    photoPreview.classList.add(className);
    isModifierNone ? effectLevel.classList.add('hidden') : effectLevel.classList.remove('hidden');

    slider.noUiSlider.updateOptions(filter.options);

    slider.noUiSlider.on('update', (values, handle) => {
      effectLevelValue.value = values[handle];
      photoPreview.style.filter =
        `${filter.effect}`
        +
        (isModifierNone ? '' : `(${effectLevelValue.value}${filter.measurement})`);
    })
  }
});

export { closeModal }
