export {createPhotos, PHOTO_COUNT};

import {getRandomNumbeOfRange, makeUniqueRandomIntGenerator} from './util.js';





//  задача 3. генерация 25 фотографий (дз 3.11. Больше деталей)

const PHOTO_COUNT = 25; // количество фото
const uniqUrlNum = makeUniqueRandomIntGenerator(1,PHOTO_COUNT);
const commentAmount = () => {return getRandomNumbeOfRange(1,3)}; // случайное кол-во комметариев от min до max включительно, к каждому фото
const description = ['дальние дали', 'ближние дали', 'дальние ближни', 'ближние ближни']; // описания фото
const names = ['Костя','Гена','Стас','Гаврила','Леха']; // имена авторов комментов
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]; //  сообщения авторов комментариев

const likes = {
  MIN:15,
  MAX:200,
} // диапазон количества лайков

const avatars = {
  MIN:1,
  MAX:6,
} // диапазон количества аватарок

const createComments = (commentNum) => {
  const comments = [];
  for (let i=1;i<=commentNum; i++){
    // const randomId = getRandomNumbeOfRange(1,PHOTO_COUNT); // генерация случайных чисел в диапазоне не страхует от повторений id. добавлен алгоритм присвоения id после формирования всех комментариев
    const randomAvatar = `img/avatar-${getRandomNumbeOfRange(avatars.MIN,avatars.MAX)}.svg`;
    const randomMessage = messages[getRandomNumbeOfRange(0,messages.length-1)];
    const randomName = names[getRandomNumbeOfRange(0,names.length-1)];
    const comment = {
      // id: randomId, // генерация случайных чисел в диапазоне не страхует от повторений id. добавлен алгоритм присвоения id после формирования всех комментариев
      id: null,
      avatar: randomAvatar,
      message: randomMessage,
      name: randomName,
    }
    comments.push(comment);
  }
  return comments;
};




const createPhotos = (photosNum) => {
  const photos = [];
  let commentId = 1;
  for (let i = 1; i<=photosNum; i++){
    const id = i;
    const url = `photos/${uniqUrlNum()}.jpg`;
    const randomDescription = description[getRandomNumbeOfRange(0,description.length-1)];
    const randomLikes = getRandomNumbeOfRange(likes.MIN,likes.MAX);
    const photo = {
      id: id,
      url: url,
      description: randomDescription,
      likes:randomLikes,
      comments:createComments(commentAmount()),
    }
    photos.push(photo);
  }

  // подсчет количества комментариев ко всем фото (опционально)
  // let commentsCounter = photos.reduce((totalComments, photo)=>{
  //   totalComments+=photo.comments.length;
  //   return totalComments;
  // },0);


  // замена изначального id = null на id с числом после формирования всех комментариев

  photos.forEach(photo => {
    photo.comments.forEach(comments =>{
      comments.id=commentId;
      commentId++;
    });
  });

  return photos;
};



















