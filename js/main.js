import {createPreviews} from './create-previews.js';
import { openCloseImgEditForm, scaleController} from './img-edit-form.js';
import { getData, sentData} from './fetch-api.js';



getData((photos) => {createPreviews(photos)},(error) => {console.log(error);});


sentData();
openCloseImgEditForm();
scaleController();








