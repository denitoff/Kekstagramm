import {createPhotos, PHOTO_COUNT} from './data.js';
export {createPreviews, createPreviewsWithForEach};
// задание 5.16. Отрисуй меня полностью (часть 1)
// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:
// Адрес изображения url подставьте как src изображения.
// Количество лайков likes подставьте как текстовое содержание элемента .picture__likes.
// Количество комментариев comments подставьте как текстовое содержание элемента .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// алгоритм
// 1. cоздать одну фотку,
// 2. присвоить ей значения
// 3. добавить во фрагмент
// 4. повторить это 25раз.
// 5. добавить фрагмент в разметку


// вариант без foreach
const createPreviews = () =>{


  const emptyPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  const photosData = createPhotos(PHOTO_COUNT);

  for (let i=0; i<photosData.length;i++){

    const newPreview = emptyPictureTemplate.cloneNode(true);
    const {url, likes, comments} = photosData[i];
    let newPreviewImg = newPreview.querySelector('.picture__img');
    let newPreviewLikes = newPreview.querySelector('.picture__likes');
    let newPreviewCommentsNumber = newPreview.querySelector('.picture__comments');

    newPreviewImg.src = url;
    newPreviewLikes.textContent = likes;
    newPreviewCommentsNumber.textContent = comments.length;
    fragment.appendChild(newPreview);
  }

  pictures.appendChild(fragment);
}


// вариант c foreach


const createPreviewsWithForEach = () =>{
  const emptyPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const fragment = document.createDocumentFragment();
  const pictures = document.querySelector('.pictures');
  const photosData = createPhotos(PHOTO_COUNT);

  photosData.forEach((value)=>{
    const newPreview = emptyPictureTemplate.cloneNode(true);
    const {url, likes, comments} = value;
    let newPreviewImg = newPreview.querySelector('.picture__img');
    let newPreviewLikes = newPreview.querySelector('.picture__likes');
    let newPreviewCommentsNumber = newPreview.querySelector('.picture__comments');

    newPreviewImg.src = url;
    newPreviewLikes.textContent = likes;
    newPreviewCommentsNumber.textContent = comments.length;
    fragment.appendChild(newPreview);
  });
  pictures.appendChild(fragment);
}
