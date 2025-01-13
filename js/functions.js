// Функция проверяющая длину строки
const checkLengthString = (string = '', maxLenght = 1) => string.length <= maxLenght;
checkLengthString ('Болею', 6);

// Функция проверяющая является ли строка палиндромом
const isPalindrome = (string) => {
  string = string.replaceAll (' ', '').toLowerCase();
  let reversedLine = '';

  for (let i = string.length - 1; i >= 0; i--){
    reversedLine += string [i];
  }
  return string === reversedLine;
};

isPalindrome ('Лёша на полке клопа нашёл ');
