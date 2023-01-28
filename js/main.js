import {createPreviews} from './create-previews.js';
import { openCloseImgEditForm, scaleController} from './img-edit-form.js';
import { getData} from './fetch-api.js';
import {showGetDataError} from './show-info.js';



getData((photos) => {createPreviews(photos)},(error) => {showGetDataError(error);});

openCloseImgEditForm();
scaleController();








