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

getRandomNumbeOfRange(2,1);


// Задача 2. Функция для проверки максимальной длины строки. Будет использоваться для проверки длины введённого комментария, но должна быть универсальна

const getMatchOfTextLengt = (text, maxLength) => {
  return text.length <= maxLength;
};

getMatchOfTextLengt('hello its checking message', 100);



