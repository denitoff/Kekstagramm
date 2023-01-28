export {getRandomNumbeOfRange, makeUniqueRandomIntGenerator, getMatchOfTextLengt};



// задача 1. Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomNumbeOfRange = (min, max) => {
// если min и/или max меньше нуля, вернем ошибку
  if(min<0 || max<0){
    return -1;
  }

  // если min больше max, то меняем их местами
  if (min > max){
    [min, max] = [max, min];
  }

  // вывод случайного числа из диапазона
  const arr = [];
  arr.length = max-min+1;
  const rand = Math.floor(Math.random() * arr.length);
  let j = 0;
  for (let i = min; i<=max; i++) {
    arr[j] = i;
    j++;
  }
  return arr[rand];
};




// Задача 2. Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна

const getMatchOfTextLengt = (text, maxLength) => {
  return text.length <= maxLength ? true : false;
};


/*
  ЗАДАЧА:
  Напишите функцию, каждый вызов который будет генерировать случайные числа
  в переданном диапазоне, но так, чтобы они не повторялись,
  пока не будут перебраны все числа из этого промежутка.
*/


const makeUniqueRandomIntGenerator = (min, max) => {
  const previous = [];
  return () =>{
    if (previous.length<max-min+1){
      let current = getRandomNumbeOfRange(min, max);
      while(previous.includes(current)){
        current = getRandomNumbeOfRange(min, max);
      }
      previous.push(current);
      return current;
    }
    // return(`интервал от ${min} до ${max} перебран итого ${previous}`);
  };
};


// isEscape

const Keys = {
  ESC:'Esc',
  ESCAPE:'Escape',
};

const isEscape = (evt) => {

  if(evt.key == Keys.ESC || evt.key == Keys.ESCAPE) {
    return true
  }
  else {
    return false
  }
}

export{isEscape}


