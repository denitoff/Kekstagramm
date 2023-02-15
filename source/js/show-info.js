import {isEscape} from './util.js'


const showGetDataError = (errorInfo) => {
  const allertContainer = document.createElement('div');
  allertContainer.style.backgroundColor = 'red';
  allertContainer.style.width = '100%';
  allertContainer.style.height = '50px';
  allertContainer.style.zIndex = '100';
  allertContainer.style.position = 'absolute';
  allertContainer.textContent = `Произошла ошибка загрузки данных с сервера, пожалуйста, повторите попытку позже.${errorInfo}`;
  allertContainer.style.textAlign='center';
  allertContainer.style.paddingTop='15px';
  allertContainer.style.top = '0';
  document.body.appendChild(allertContainer);
  setTimeout(() => {allertContainer.remove()}, 5000)
};
export{showGetDataError}





// сообщение о успешной отправке формы


const showSentDataFormSuccess = () => {
  const successSectionTemplate = document.querySelector('#success').content.querySelector('.success');
  let successSection = successSectionTemplate.cloneNode(true);
  const successSectionCloseButton = successSection.querySelector('.success__button');
  document.body.appendChild(successSection);

  successSectionCloseButton.addEventListener('click', () =>{
    successSection.remove();
  });

  document.body.addEventListener('click', (evt) =>{
    const clickedElement = evt.target;
    if ((!clickedElement.classList.contains('success__inner'))&&(!clickedElement.classList.contains('success__title'))){
      successSection.remove();
    }
  });

  document.body.addEventListener('keydown', (evt)=>{
    if(isEscape(evt)){
      successSection.remove();
    }
  });


}

export{showSentDataFormSuccess}

// сообщение о неуспешной отправке формы

const showSentDataFormError = () => {
  const errorSectionTemplate = document.querySelector('#error').content.querySelector('.error');
  let errorSection = errorSectionTemplate.cloneNode(true);
  const errorSectionCloseButton = errorSection.querySelector('.error__button');
  document.body.appendChild(errorSection);

  errorSectionCloseButton.addEventListener('click', () =>{
    errorSection.remove();
  });

  document.body.addEventListener('click', (evt) =>{
    const clickedElement = evt.target;
    if ((!clickedElement.classList.contains('error__inner'))&&(!clickedElement.classList.contains('error__title'))){
      errorSection.remove();
    }
  });

  document.body.addEventListener('keydown', (evt)=>{
    if(isEscape(evt)){
      errorSection.remove();
    }
  });


}



export{showSentDataFormError}
