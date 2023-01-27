import {createPreviews} from './create-previews.js';
import { openCloseImgEditForm, scaleController} from './img-edit-form.js';
import { getData, sentData} from './fetch-api.js';
import {showGetDataError} from './show-error.js';



getData((photos) => {createPreviews(photos)},(error) => {showGetDataError(error);});
sentData();
openCloseImgEditForm();
scaleController();








