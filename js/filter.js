/* global _:readonly */
import {createPreviews} from './create-previews.js';
import {makeUniqueRandomIntGenerator} from './util.js';





const filtersBlock = document.querySelector('.img-filters');
const filterDefault = filtersBlock.querySelector('#filter-default');
const filterRandom = filtersBlock.querySelector('#filter-random');
const filterDiscussed = filtersBlock.querySelector('#filter-discussed');
const NUMBERRMDPHOTO = 10;
const DEBOUNCE_TIME = 200;



const getFilters = () => {
  filtersBlock.classList.remove('img-filters--inactive');

  filterDefault.addEventListener('click',()=>{
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  });

  filterRandom.addEventListener('click',()=>{
    filterRandom.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
  });

  filterDiscussed.addEventListener('click',()=>{
    filterDiscussed.classList.add('img-filters__button--active');
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
  });

};

const clearPreviews = ()=>{
  const allPreviews = document.querySelectorAll('.picture');
  allPreviews.forEach((element) => {element.remove();});
};


const sortByDefault = (photosFromServer) => {
  filterDefault.addEventListener('click',_.debounce(()=>{



    clearPreviews();
    const sortByDefault = photosFromServer;
    createPreviews(sortByDefault);
  },DEBOUNCE_TIME));
};





const sortByRandom = (photosFromServer) => {
  filterRandom.addEventListener('click',_.debounce(()=>{




    clearPreviews();
    const sortByRandom=[];
    let getRandomOnePhotoFromAll = makeUniqueRandomIntGenerator(0, photosFromServer.length-1);
    for (let i=0; i<photosFromServer.length; i++){
      sortByRandom.push(photosFromServer[getRandomOnePhotoFromAll()])
    }
    createPreviews(sortByRandom.slice(0,NUMBERRMDPHOTO));


  },DEBOUNCE_TIME));
};


const sortByDiscussed = (photosFromServer) => {
  filterDiscussed.addEventListener('click',_.debounce(()=>{





    clearPreviews();
    let copyPhotosFromServer = photosFromServer.slice(0);
    let sortByDiscussed = [];
    sortByDiscussed = copyPhotosFromServer.sort((a,b)=>{
      if (a.comments.length > b.comments.length) {
        return -11;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });

    createPreviews(sortByDiscussed);
  },DEBOUNCE_TIME));

};










export {getFilters, sortByDefault, sortByRandom, sortByDiscussed};
