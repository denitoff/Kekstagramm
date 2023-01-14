export {openCloseImgEditForm};
export {scaleController};
import '/nouislider/nouislider.js';
/* global noUiSlider:readonly */


const deleteEffectsFromImg = () => {
  effects.forEach((element)=>{
    imgUploadPreview.classList.remove(element);
  });
};

const Keys = {
  ESC:'Esc',
  ESCAPE:'Escape',
};
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const imgUploadCancelButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const scaleControlSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const scaleControlBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadOverlay.querySelector('.scale__control--value');

const SCALE_STEPS = ['25%', '50%', '75%', '100%'];
const DEF_SCALE_STEP = SCALE_STEPS.length-1; // шаг по умолчанию - 3, т.е. 100%
const DEF_SCALE_VALUE = SCALE_STEPS[DEF_SCALE_STEP]; // значание масштаба при шаге по умолчанию - 100%
let currentScaleStep;
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

const textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
const textDescription = imgUploadOverlay.querySelector('.text__description');


let textHashtagsFocus = false;
let textDescriptionFocus = false;




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

    imgUploadCancelButton.addEventListener('click', (evt)=>{
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      body.classList.remove('modal-open');
      imgUploadInput.value = '';
      imgUploadPreview.style.cssText = '';
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
        if(evt.key == Keys.ESC || evt.key == Keys.ESCAPE){
          imgUploadOverlay.classList.add('hidden');
          body.classList.remove('modal-open');
          imgUploadInput.value = '';
          imgUploadPreview.style.cssText = '';
        }
      }
    });
  });
};



const resetScaleFilters = () => {
  for (let i=0; i<SCALE_STEPS.length; i++){
    imgUploadPreview.classList.remove(`scale__${i}`);
  }
};



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

  if (effectChrome.querySelector('.effect-chrome').checked == true){
    imgUploadPreview.style.cssText = `filter: grayscale(${effectLevelValueInput.value});`;
    effectLevelValueInput.value = values[handle];
  }

  else if (effectSepia.querySelector('.effect-sepia').checked == true){
    imgUploadPreview.style.cssText = `filter: sepia(${effectLevelValueInput.value});`;
    effectLevelValueInput.value = values[handle];
  }

  else if (effectMarvin.querySelector('.effect-marvin').checked == true){
    imgUploadPreview.style.cssText = `filter: invert(${effectLevelValueInput.value}%);`;
    effectLevelValueInput.value = values[handle];
  }

  else if (effectPhobos.querySelector('.effect-phobos').checked == true){
    imgUploadPreview.style.cssText = `filter: blur(${effectLevelValueInput.value}px);`;
    effectLevelValueInput.value = values[handle];
  }

  else if (effectHeat.querySelector('.effect-heat').checked == true){
    imgUploadPreview.style.cssText = `filter: brightness(${effectLevelValueInput.value});`;
    effectLevelValueInput.value = values[handle];
  }

});
