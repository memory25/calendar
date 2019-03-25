import generateDaysTable from './generateDaysTable';

const WEEKDAYS = 7;

/*
 * @param {number} currentViewYear
 * @param {number} currentViewMonth
 *
 * @returns {object[]} list
 * @param {number} list.year
 * @param {number} list.month
 * @param {number} list.day
 * @param {number} list.date
 */
function generateDaysList(currentViewYear, currentViewMonth) {
  const daysTable = generateDaysTable(currentViewYear);
  const lackHead = new Date(
    // IE Firefox will Nan
    // `${currentViewYear}-${currentViewMonth}-01`
    `${currentViewYear}/${currentViewMonth}/01`
  ).getDay();
  const lackTail =
    13 -
    new Date(
      `${currentViewYear}/${currentViewMonth}/${daysTable[currentViewMonth]}`
    ).getDay();

  const list = [];
  for (
    let i =
      daysTable[currentViewMonth === 1 ? 12 : currentViewMonth - 1] - lackHead;
    i < daysTable[currentViewMonth === 1 ? 12 : currentViewMonth - 1];
    i += 1
  ) {
    list.push({
      year: currentViewYear,
      month: currentViewMonth - 1,
      date: i + 1,
      day: list.length % WEEKDAYS,
    });
  }
  for (let i = 0; i < daysTable[currentViewMonth]; i += 1) {
    list.push({
      year: currentViewYear,
      month: currentViewMonth,
      date: i + 1,
      day: list.length % WEEKDAYS,
    });
  }
  for (let i = 0; i < lackTail; i += 1) {
    if (list.length / WEEKDAYS < 6) {
      list.push({
        year: currentViewYear,
        month: currentViewMonth + 1,
        date: i + 1,
        day: list.length % WEEKDAYS,
      });
    }
  }
  if (list.length / WEEKDAYS === 5) {
    for (let i = lackTail; i < lackTail + WEEKDAYS; i += 1) {
      list.push({
        year: currentViewYear,
        month: currentViewMonth + 1,
        date: i + 1,
        day: list.length % WEEKDAYS,
      });
    }
  }
  return list;
}

export default generateDaysList;
