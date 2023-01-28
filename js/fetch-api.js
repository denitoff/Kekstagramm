
// получение данных


const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((resp)=>{
      if(resp.ok){
        return resp.json()
      }
      else {
        throw new Error(`The error number is ${resp.status}, error description (optional...) ${resp.statusText}`)
      }
    })
    .then((respJson)=>{onSuccess(respJson)})
    .catch((error)=>{onError(error)});

};
export {getData}

// отправка данных
const sentData = (showSuccess, onFail, formData) => {
  fetch('https://23.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    })
    .then((resp)=>{
      if (resp.ok){
        showSuccess();
      }
      else {
        onFail();
      }
    })

    .catch(()=>{
      onFail();
    })
}

export {sentData}
