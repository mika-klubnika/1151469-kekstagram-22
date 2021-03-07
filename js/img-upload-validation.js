import { isEscEvent, checkStringLength } from './util.js'
import {
  MAX_HASHTAG_LENGTH,
  MAX_HASHTAG_COUNT,
  MAX_COMMENT_LENGTH
} from './constants.js';

const hashtags = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');
const uploadTextBlock = document.querySelector('.img-upload__text');

//Валидация хештегов
const onHashtagsValidation = (evt) => {
  const input = evt.target;
  const arrayHashtagsUnfiltered = input.value.trim().toLowerCase().split(' ').filter(string => string);
  const arrayHashtags = Array.from(new Set(arrayHashtagsUnfiltered));

  if(arrayHashtagsUnfiltered.length > arrayHashtags.length) {
    input.setCustomValidity('Нельзя указывать одинаковые хэштеги')
  }
  else if(arrayHashtagsUnfiltered.length > MAX_HASHTAG_COUNT) {
    input.setCustomValidity('Нельзя указать больше 5 хэштегов')
  }
  else {
    arrayHashtags.forEach(hashtag => {
      if(hashtag.length === 1 || hashtag.charAt(0) !== '#') {
        input.setCustomValidity('Хэштег должен начинается с символа #, не может состоять только из него');
      }
      else if(hashtag.length > MAX_HASHTAG_LENGTH) {
        input.setCustomValidity('Максимальная длина одного хэштега 20 символов, включая решётку');
      }
      else if(!(/^[а-яА-ЯёЁa-zA-Z0-9]+$/).test(hashtag.substring(1))) {
        input.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать другие символы');
      }
      else {
        input.setCustomValidity('');
      }
    })
  }

  input.reportValidity();
};

//Валидация комментария
const onCommentValidation = () => {
  if (!checkStringLength(description.value, MAX_COMMENT_LENGTH)) {
    description.setCustomValidity('Можно ввести еще ' + (MAX_COMMENT_LENGTH - description.value.length) + ' символов');
  } else {
    description.setCustomValidity('');
  }
  description.reportValidity();
};

//Отмена закрытия по Esc
const onCancelEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
};

//Обработчики
uploadTextBlock.addEventListener('focus', () => {
  document.body.addEventListener('keydown', onCancelEscKeydown);
  description.addEventListener('input', onCommentValidation);
  hashtags.addEventListener('input', onHashtagsValidation);
}, {capture: true});

uploadTextBlock.addEventListener('blur', () => {
  document.body.removeEventListener('keydown', onCancelEscKeydown);
  description.removeEventListener('input', onCommentValidation);
  hashtags.removeEventListener('input', onHashtagsValidation);
}, {capture: true});
