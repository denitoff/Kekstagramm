// import {createPhotos, PHOTO_COUNT} from './data.js';
export {createPreviews};
import {openPreview} from './open-preview.js';






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




const emptyPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const pictures = document.querySelector('.pictures');
// const photosData = createPhotos(PHOTO_COUNT);
// отказываемся от генерации фото, тк данные начинаем получать с сервера







const createPreviews = (photosData) =>{
  
  photosData.forEach((onePhotoData)=>{
    const newPreview = emptyPictureTemplate.cloneNode(true);
    const {url, likes, comments} = onePhotoData;
    let newPreviewImg = newPreview.querySelector('.picture__img');
    let newPreviewLikes = newPreview.querySelector('.picture__likes');
    let newPreviewCommentsNumber = newPreview.querySelector('.picture__comments');

    newPreviewImg.src = url;
    newPreviewLikes.textContent = likes;
    newPreviewCommentsNumber.textContent = comments.length;


    newPreview.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPreview(onePhotoData);
    });

    fragment.appendChild(newPreview);
  });
  pictures.appendChild(fragment);

}




