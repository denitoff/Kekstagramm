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


const socialCommentCount = bigPictureSection.querySelector('.social__comment-count');
const commentLoader = bigPictureSection.querySelector('.comments-loader');

const bigPictureCloseBtn = bigPictureSection.querySelector('.big-picture__cancel');


// главная ф-ция
const openPreview = (onePhotoData) => {
  addDiscription(onePhotoData);
  clearHtmlComments();
  addComments(onePhotoData);
  //
  addFiveComments();
  //
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

//
const addFiveComments = () =>{
  let commentsStep = 5;
  let clicks = 1;
  const comments = socialCommentsList.querySelectorAll('.social__comment');
  const commentsCountOpened = document.querySelector('.comments-count-opened');
  commentsCountOpened.textContent = '5';
  if (comments.length>=commentsStep){
    socialCommentCount.classList.remove('visually-hidden');
    commentLoader.classList.remove('visually-hidden');
    for (let i=commentsStep; i<=comments.length-1;i++){
      comments[i].classList.add('hidden')
    }
    commentLoader.addEventListener('click',()=>{
      clicks++;
      for (let i=commentsStep; i<commentsStep*clicks;i++){
        if(i<=comments.length-1){
          commentsCountOpened.textContent = i+1;
          comments[i].classList.remove('hidden');
        }
        else{
          commentLoader.classList.add('visually-hidden');
          break
        }
      }
    });
  }
  else{
    socialCommentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');
  }
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
