import { isEscape } from './util.js';

export { openPreview };

const bigPictureSection = document.querySelector('.big-picture');
let bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
let likesCount = bigPictureSection.querySelector('.likes-count');
let commentsCount = bigPictureSection.querySelector('.comments-count');
let socialCaption = bigPictureSection.querySelector('.social__caption');
let socialCommentsList = bigPictureSection.querySelector('.social__comments');


const newCommentContent = '<img class="social__picture" src="{{аватар}}" alt="{{имя комментатора}}" width="35" height="35"> <p class="social__text">{{текст комментария}}</p>';
const body = document.querySelector('body');

// то что ниже, временно скрыть по заданию (ф-ция temporaryHidden )
const socialCommentCount = bigPictureSection.querySelector('.social__comment-count');
const commentLoader = bigPictureSection.querySelector('.comments-loader');
const bigPictureCloseBtn = bigPictureSection.querySelector('.big-picture__cancel');


// главная ф-ция
const openPreview = (onePhotoData) => {
  addDiscription(onePhotoData);
  clearHtmlComments();
  addComments(onePhotoData);
  temporaryHidden();   //временно скрыть согласно заданию
  openPhoto();
  closePhoto();
};


const addDiscription = (onePhotoData) => {
  bigPictureImg.src = onePhotoData.url;
  likesCount.textContent = onePhotoData.likes;
  commentsCount.textContent = onePhotoData.comments.length;
  socialCaption.textContent = onePhotoData.description
};



const clearHtmlComments = () => {
  let socialComments = socialCommentsList.querySelectorAll('.social__comment');
  socialComments.forEach(element => {
    element.remove();
  });
};


const addComments = (onePhotoData) => {
  let newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  newComment.innerHTML = newCommentContent;
  let newCommentImg = newComment.querySelector('.social__picture');
  let newCommentParagraph = newComment.querySelector('.social__text');
  const fragment = document.createDocumentFragment();

  onePhotoData.comments.forEach( (element) => {
    newCommentImg.src = element.avatar;
    newCommentImg.alt = element.name;

    newCommentParagraph.textContent = element.message;
    fragment.appendChild(newComment.cloneNode(true));
    socialCommentsList.appendChild(fragment);

  });

};



const temporaryHidden = () => {
  socialCommentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
};


const openPhoto = () => {
  bigPictureSection.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closePhoto = () => {
  body.addEventListener('keydown', (evt)=>{
    if (isEscape(evt))
      bigPictureSection.classList.add('hidden');
    body.classList.remove('modal-open');
    clearHtmlComments();
  });


  bigPictureCloseBtn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    bigPictureSection.classList.add('hidden');
    body.classList.remove('modal-open');
    body.removeEventListener('keydown', ()=>{}); // не уверен, что работает
    clearHtmlComments();
  });


};
