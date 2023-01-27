
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

