// Проверяем, является ли строка палиндромом

const checkInPalindrom = (text) => {
  const string = text.toLowerCase().replaceAll(' ', '');
  const newString = string.split('').reverse().join('');
  return (string === newString) ? 'Это палиндром' : 'Это не палиндром';
};

checkInPalindrom('Лёша на полке клопа нашёл ');

// console.log(checkInPalindrom('Лёша на полке клопа нашёл '));

// Извлекаем целые числа из строки

const toNumber = (num) => {
  let result = '';
  let thisNum;

  if (typeof(num) === 'string') {
    thisNum = num.replaceAll(' ', '');
  } else {
    thisNum = num.toString();
  }

  for (let i = 0; i < thisNum.length; i++) {
    const type = Number(thisNum[i]);
    if (!isNaN(type)){
      result += type;
    }
  }

  result = Number(result);

  if (result === 0) {
    result = NaN;
  }

  return result;
};

toNumber('а я томат');
// console.log(toNumber('а я томат'));

// Функция, возвращающая исходную строку, дополненую указанными символами до заданной длины

const redefenitionString = (string, count, addSymbol) => {
  let result = string;

  if (result.length >= count) {
    return result;
  }

  if (addSymbol.length > count - result.length) {
    for (let i = 1; i <= count - string.length; i++) {
      result = addSymbol[count - string.length - i] + result;
    }
    return result;
  }

  for (let i = 1; i <= count - string.length; i++) {
    result = addSymbol[addSymbol.length - i] + result;

    if (addSymbol.length - i <= 0) {
      while (result.length < count) {
        result = addSymbol[0] + result;
      }
      return result;
    }
  }
};

redefenitionString('qwerty', 4, '0');
// console.log(redefenitionString('qwerty', 4, '0'));

// Проверка длины строки

const checkingLenght = (string, count) => string.length <= count;

checkingLenght('проверяемая строка', 18);
// console.log(checkingLenght('проверяемая строка', 17));
