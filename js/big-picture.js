import {isEscEvent} from './util.js'

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

// Открываем модалку
const pictures = document.querySelectorAll('.picture');

pictures.forEach(picture => {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
  })
});

//Закрываем модалку
bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});


/*
ТЗ

Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
Описание фотографии description вставьте строкой в блок .social__caption.

После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
При закрытии окна не забудьте удалить этот класс.
*/
