export {openCloseImgEditForm};
export {scaleController};
import '/nouislider/nouislider.js';
import {getMatchOfTextLengt, isEscape} from './util.js';
import {showSentDataFormSuccess, showSentDataFormError} from './show-info.js';
import {sentData} from './fetch-api.js';
/* global noUiSlider:readonly */


const deleteEffectsFromImg = () => {
  effects.forEach((element)=>{
    imgUploadPreview.classList.remove(element);
  });
};


const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');

const imgUploadForm = document.querySelector('.img-upload__form');


const SCALE_STEPS = ['25%', '50%', '75%', '100%'];
const DEF_SCALE_STEP = SCALE_STEPS.length-1; // шаг по умолчанию - 3, т.е. 100%
const DEF_SCALE_VALUE = SCALE_STEPS[DEF_SCALE_STEP]; // значание масштаба при шаге по умолчанию - 100%
let currentScaleStep;
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

const textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
const textDescription = imgUploadOverlay.querySelector('.text__description');

let textHashtagsFocus = false;
let textDescriptionFocus = false;

const closeForm = ()=>{
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgUploadInput.value = '';
  imgUploadPreview.style.cssText = '';
}

const openCloseImgEditForm = () =>{
  imgUploadInput.addEventListener('change',()=>{
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    scaleControlValue.value = DEF_SCALE_VALUE;
    currentScaleStep = SCALE_STEPS.length-1;
    resetScaleFilters();
    effectLevelSlider.classList.add('visually-hidden');
    deleteEffectsFromImg();
    effectNone.querySelector('.effect-none').checked = true;
    textDescription.value='';
    textHashtags.value='';


    imgUploadCancelButton.addEventListener('click', (evt)=>{
      evt.preventDefault();
      closeForm();

    });

    // если поле ввода хештега или комментария в фокусе, закрытие окна черех esc заблокировано

    textHashtags.onfocus = () =>{
      textHashtagsFocus = true;
    };
    textHashtags.onblur = () =>{
      textHashtagsFocus = false;
    };

    textDescription.onfocus = () =>{
      textDescriptionFocus = true;
    };
    textDescription.onblur = () =>{
      textDescriptionFocus = false;

    };




    body.addEventListener('keydown', (evt)=>{
      if((textHashtagsFocus==false)&&(textDescriptionFocus==false)){
        if(isEscape(evt)){
          closeForm();
        }
      }
    });
  });
};


// сброс фильтров при открытии формы
const resetScaleFilters = () => {
  for (let i=0; i<SCALE_STEPS.length; i++){
    imgUploadPreview.classList.remove(`scale__${i}`);
  }
};


// уменьшение увеличение размера фото
const scaleController = () =>{

  scaleControlSmaller.addEventListener('click', ()=>{
    if (currentScaleStep>0){
      currentScaleStep--;
      scaleControlValue.value = SCALE_STEPS[currentScaleStep];

      let currentFilter = `scale__${currentScaleStep}`;
      imgUploadPreview.classList.add(currentFilter);

      let previousFilter = `scale__${currentScaleStep+1}`;
      imgUploadPreview.classList.remove(previousFilter);
    }
  });

  scaleControlBigger.addEventListener('click', ()=>{
    if (currentScaleStep<SCALE_STEPS.length-1){
      currentScaleStep++;
      scaleControlValue.value = SCALE_STEPS[currentScaleStep];

      let currentFilter = `scale__${currentScaleStep}`;
      imgUploadPreview.classList.add(currentFilter);

      let previousFilter = `scale__${currentScaleStep-1}`;
      imgUploadPreview.classList.remove(previousFilter);
    }
  });

};


// effects slider
const effectLevelSlider = imgUploadOverlay.querySelector('.effect-level__slider');

const effectNone = imgUploadOverlay.querySelector('.effects__item--none');
const effectChrome = imgUploadOverlay.querySelector('.effects__item--chrome');
const effectSepia = imgUploadOverlay.querySelector('.effects__item--sepia');
const effectMarvin = imgUploadOverlay.querySelector('.effects__item--marvin');
const effectPhobos = imgUploadOverlay.querySelector('.effects__item--phobos');
const effectHeat = imgUploadOverlay.querySelector('.effects__item--heat');
const effects = ['effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat']
const effectLevelValueInput = imgUploadOverlay.querySelector('.effect-level__value');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  connect: 'lower',
  step: 0.1,
});




effectNone.addEventListener('click',()=>{
  effectLevelSlider.classList.add('visually-hidden');
  deleteEffectsFromImg();
  effectNone.querySelector('.effect-none').checked = true;
  imgUploadPreview.style.cssText = '';

});

effectChrome.addEventListener('click',()=>{
  deleteEffectsFromImg();
  effectLevelSlider.classList.remove('visually-hidden');
  imgUploadPreview.classList.add('effects__preview--chrome');
  effectChrome.querySelector('.effect-chrome').checked = true;
  imgUploadPreview.style.cssText = '';

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
});



effectSepia.addEventListener('click',()=>{
  deleteEffectsFromImg();
  effectLevelSlider.classList.remove('visually-hidden');
  imgUploadPreview.classList.add('effects__preview--sepia');
  effectSepia.querySelector('.effect-sepia').checked = true;
  imgUploadPreview.style.cssText = '';

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });

});

effectMarvin.addEventListener('click',()=>{
  deleteEffectsFromImg();
  effectLevelSlider.classList.remove('visually-hidden');
  imgUploadPreview.classList.add('effects__preview--marvin');
  effectMarvin.querySelector('.effect-marvin').checked = true;
  imgUploadPreview.style.cssText = '';

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  });


});

effectPhobos.addEventListener('click',()=>{
  deleteEffectsFromImg();
  effectLevelSlider.classList.remove('visually-hidden');
  imgUploadPreview.classList.add('effects__preview--phobos');
  effectPhobos.querySelector('.effect-phobos').checked = true;
  imgUploadPreview.style.cssText = '';

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  });

});

effectHeat.addEventListener('click',()=>{
  deleteEffectsFromImg();
  effectLevelSlider.classList.remove('visually-hidden');
  imgUploadPreview.classList.add('effects__preview--heat');
  effectHeat.querySelector('.effect-heat').checked = true;
  imgUploadPreview.style.cssText = '';

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  });

});









effectLevelSlider.noUiSlider.on('update', (values, handle)=>{
  effectLevelValueInput.value = values[handle];

  if (effectChrome.querySelector('.effect-chrome').checked == true){
    effectLevelValueInput.value = values[handle];
    imgUploadPreview.style.cssText = `filter: grayscale(${effectLevelValueInput.value});`;
  }

  else if (effectSepia.querySelector('.effect-sepia').checked == true){
    effectLevelValueInput.value = values[handle];
    imgUploadPreview.style.cssText = `filter: sepia(${effectLevelValueInput.value});`;

  }

  else if (effectMarvin.querySelector('.effect-marvin').checked == true){
    effectLevelValueInput.value = values[handle];
    imgUploadPreview.style.cssText = `filter: invert(${effectLevelValueInput.value}%);`;

  }

  else if (effectPhobos.querySelector('.effect-phobos').checked == true){
    effectLevelValueInput.value = values[handle];
    imgUploadPreview.style.cssText = `filter: blur(${effectLevelValueInput.value}px);`;

  }

  else if (effectHeat.querySelector('.effect-heat').checked == true){
    effectLevelValueInput.value = values[handle];
    imgUploadPreview.style.cssText = `filter: brightness(${effectLevelValueInput.value});`;
  }

});


// валидация ввода хештега textHashtags

const MAX_HASH_LENGTH = 20;
const MAX_HASH_NUMBER = 5;


textHashtags.addEventListener('input',()=>{
  let hashTagArr = []
  let hashTagText = textHashtags.value.toLowerCase();



  hashTagArr = hashTagText.split(' ');





  let hashTagNumber = hashTagText.split('#').length-1;

  if (hashTagText.includes('# ')){
    textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
  }



  else if (hashTagNumber>MAX_HASH_NUMBER){
    textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов;');
  }

  else
  {
    textHashtags.setCustomValidity('');
  }


  if (hashTagArr.length>=2){


    hashTagArr=hashTagArr.filter((element)=> {
      return (element != '');
    });

    if (new Set(hashTagArr).size !== hashTagArr.length){

      textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды;');
    }

  }


  const SIMBOLS=/[<\->[().^+,'"`|/?~!@#$%^=&*_-]/;
  //const SIMBOLS=/[^qwertyuiopasdfghjklzxcvbnmёйцукенгшщзхъфывапролджэячсмитьбю0123456789]/;

  hashTagArr.forEach((element)=>{


    if (element.length>=MAX_HASH_LENGTH){
      textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку, для разделения хэш-тегов используйте пробел');
    }
    else if(element.length>0){
      if(!element[0].includes('#')) {
        textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
      }

      else if (element=='#'){
        textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      }



      else if(element.length>1){
        let hashTagWithoutHash = element.slice(1);


        if(hashTagWithoutHash.match(SIMBOLS)){
          textHashtags.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
        }
      }
    }


  });

  textHashtags.reportValidity();
});



// валидация поля ввода комментария

const MAX_COMMENT_LENGTH = 140;

textDescription.addEventListener('input',()=>{
  textDescription.reportValidity();

  if (!getMatchOfTextLengt(textDescription.value, MAX_COMMENT_LENGTH)){

    textDescription.setCustomValidity('длина комментария не может составлять больше 140 символов');
  }

  else {
    textDescription.setCustomValidity('');
  }
  textDescription.reportValidity();
});





// отправка формы

const editFormSubmit = ( showSuccess, onFail) => {
  imgUploadForm.addEventListener('submit',(evt)=>{



    evt.preventDefault();
    const formData = new FormData(evt.target);
    sentData( showSuccess, onFail, formData)
    closeForm();



  });
};

editFormSubmit(showSentDataFormSuccess, showSentDataFormError)




