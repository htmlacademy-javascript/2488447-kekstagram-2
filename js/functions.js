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

// Функция, которая проверяет укладывается ли встреча в рамки рабочего дня

const checkMeetingWithinWorkHours = (startDay, endDay, meetingStart, meetingTime) => {
  const convertsMinutesToHours = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startDayOfMinutes = convertsMinutesToHours(startDay);
  const endDayOfMinutes = convertsMinutesToHours(endDay);
  const meetingStartOfMinutes = convertsMinutesToHours(meetingStart);
  const meetingDuration = meetingStartOfMinutes + meetingTime;

  return meetingStartOfMinutes >= startDayOfMinutes && meetingDuration <= endDayOfMinutes;
};

checkMeetingWithinWorkHours('08:00', '17:30', '14:00', 90);
// console.log(checkMeetingWithinWorkHours('8:0', '10:0', '8:0', 120));
// console.log(checkMeetingWithinWorkHours('08:00', '14:30', '14:00', 90));
// console.log(checkMeetingWithinWorkHours('14:00', '17:30', '08:0', 90));
// console.log(checkMeetingWithinWorkHours('8:00', '17:30', '08:00', 900));
