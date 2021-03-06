/* global _:readonly */
import { isEscEvent } from './util.js';
import {
  MAX_HASHTAG_LENGTH,
  MAX_HASHTAG_COUNT,
  MAX_COMMENT_LENGTH,
  DELAY
} from './constants.js';

const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const uploadTextBlock = document.querySelector('.img-upload__text');

//Отмена закрытия по Esc
const onCancelEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
};

//Валидация хештегов
const onHashtagsValidation = _.debounce((evt) => {
  const input = evt.target;
  input.classList.add('input-invalid');

  if (!input.value) {
    input.setCustomValidity('');
  }

  const arrayHashtagsUnfiltered = input.value.trim().toLowerCase().split(' ').filter(string => string);
  const arrayHashtags = Array.from(new Set(arrayHashtagsUnfiltered));

  if (arrayHashtagsUnfiltered.length > arrayHashtags.length) {
    input.setCustomValidity('Нельзя указывать одинаковые хэштеги')
  }
  else if (arrayHashtagsUnfiltered.length > MAX_HASHTAG_COUNT) {
    input.setCustomValidity('Нельзя указать больше 5 хэштегов')
  }
  else {
    arrayHashtags.forEach(hashtag => {
      if (hashtag.length === 1 || hashtag.charAt(0) !== '#') {
        input.setCustomValidity('Хэштег должен начинается с символа #, не может состоять только из него');
      }
      else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        input.setCustomValidity('Максимальная длина одного хэштега 20 символов, включая решётку');
      }
      else if (!(/^[а-яА-ЯёЁa-zA-Z0-9]+$/).test(hashtag.substring(1))) {
        input.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать другие символы');
      }
      else {
        input.setCustomValidity('');
        input.classList.remove('input-invalid');
      }
    })
  }

  input.reportValidity();
}, DELAY);

//Валидация комментария
const onCommentValidation = _.debounce((evt) => {
  const input = evt.target;
  input.classList.add('input-invalid');

  if (!input.value) {
    input.setCustomValidity('');
  }
  else if (input.value.length > MAX_COMMENT_LENGTH) {
    input.setCustomValidity(`Максимальный размер комментария ${MAX_COMMENT_LENGTH} символов`);
  }
  else {
    input.setCustomValidity('');
    input.classList.remove('input-invalid')
  }

  input.reportValidity();
}, DELAY);

//Обработчики
uploadTextBlock.addEventListener('focus', () => {
  document.body.addEventListener('keydown', onCancelEscKeydown);
  description.addEventListener('input', onCommentValidation);
  hashtags.addEventListener('input', onHashtagsValidation);
}, true);

uploadTextBlock.addEventListener('blur', () => {
  document.body.removeEventListener('keydown', onCancelEscKeydown);
  description.removeEventListener('input', onCommentValidation);
  hashtags.removeEventListener('input', onHashtagsValidation);
}, true);

export { uploadTextBlock }
