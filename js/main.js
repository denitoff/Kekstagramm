import {createPreviews} from './create-previews.js';
import {openCloseImgEditForm, scaleController} from './img-edit-form.js';
import {getData} from './fetch-api.js';
import {showGetDataError} from './show-info.js';
import {getFilters,sortByDefault, sortByRandom, sortByDiscussed} from './filter.js';







getData((photos) => {
  createPreviews(photos);
  getFilters();

  sortByDefault(photos);
  sortByRandom(photos);
  sortByDiscussed(photos);}
,(error) => {showGetDataError(error);});

openCloseImgEditForm();
scaleController();

sortByDefault





