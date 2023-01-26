
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
const sentData = () => {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    credentials: 'same-origin',
    body: new FormData(),
  })

    .then((resp)=>{
      if (resp.ok){
        return resp.json()
      }
      else{
        throw new Error(`The error number is ${resp.status}, error description (optional...) ${resp.statusText}`)
      }
    })
    .then((respJson)=>{console.log(respJson)})
    .catch((error)=>{console.log(error)});
}

export {sentData}
