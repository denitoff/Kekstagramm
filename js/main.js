'use strict';

// задача 1. Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomNumbeOfRange = (min, max) => {

  // если min и/или max меньше нуля, вернем ошибку
  if(min<0 || max<0){
    return -1;
  }

  // если min больше max, то меняем их местами
  if (min > max){
    [min, max] = [max, min];
  }

  // вывод случайного числа из диапазона

  const arr = [];
  arr.length = max-min+1;
  const rand = Math.floor(Math.random() * arr.length);
  let j = 0;
  for (let i = min; i<=max; i++) {
    arr[j] = i;
    j++;
  }
  return arr[rand];
};

getRandomNumbeOfRange(2,1);


// Задача 2. Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна

const getMatchOfTextLengt = (text, maxLength) => {
  return text.length <= maxLength;
};

getMatchOfTextLengt('hello its checking message', 100);


////////////////////////////////////////////////////////////////////////////////
const photoAmount=25; // количество фото
const commentAmount = () => {return getRandomNumbeOfRange(0,3)}; // случайное кол-во комметариев от 0 до 3х к каждому фото
const description = ['дальние дали', 'ближние дали', 'ближние ближни']; // описания фото
const names = ['Костя','Гена','Стас','Гаврила','Леха']; // имена авторов комментов
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
]; //  сообщения авторов комментариев


const createComments = (commentNum) => {
  const comments = [];
  for (let i=1;i<=commentNum; i++){
    const randomId = getRandomNumbeOfRange(1,photoAmount);
    const randomAvatar = `img/avatar-${getRandomNumbeOfRange(1,6)}.svg`;
    const randomMessage = messages[getRandomNumbeOfRange(0,messages.length-1)];
    const randomName = names[getRandomNumbeOfRange(0,names.length-1)];
    const comment = {
      id: randomId,
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
  for (let i = 1; i<=photosNum; i++){
    const randomId = getRandomNumbeOfRange(1,photoAmount);
    const randomUrl = `photos/${getRandomNumbeOfRange(1,photoAmount)}.jpg`;
    const randomDescription = description[getRandomNumbeOfRange(0,description.length-1)];
    const randomLikes = getRandomNumbeOfRange(15,200);
    const photo = {
      id: randomId,
      url: randomUrl,
      description: randomDescription,
      likes:randomLikes,
      comments:createComments(commentAmount()),
    }
    photos.push(photo);
  }
  return photos;
};

console.log(createPhotos(photoAmount));













