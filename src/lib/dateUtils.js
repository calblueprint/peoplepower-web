const dateToWord = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

// expected format of date: YYYY-MM-DD
function dateToDateString(date) {
  const dateArr = date.split('-');
  return `${dateToWord[parseInt(dateArr[1], 10)].substring(0, 3)} ${
    dateArr[2]
  }, ${dateArr[0]}`;
}

function dateToFullMonth(date) {
  return dateToWord[parseInt(date.split('-')[1], 10)];
}

// expected format of date: YYYY-MM-DD
function formatDate(date) {
  const dateArr = date.split('-');
  return `${parseInt(dateArr[1], 10)}/${dateArr[2]}/${dateArr[0]}`;
}

export { dateToDateString, dateToFullMonth, formatDate };
