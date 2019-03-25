import generateDaysTable from 'utils/generateDaysTable';

/*
 * @param {object} inputDate
 * @param {number} inputDate.year
 * @param {number} inputDate.month
 *
 * @param {object} originDate
 * @param {number} originDate.year
 * @param {number} originDate.month
 * @param {number} originDate.date
 * @param {number} originDate.day
 *
 * @return {object} :originDate
 */
function correctOverflowDate(inputDate, originDate) {
  const {year, month} = inputDate;
  const daysTable = generateDaysTable(year);

  if (daysTable[month] > originDate.date) {
    return {
      ...originDate,
      year,
      month,
      day: new Date(year, month - 1, originDate.date).getDay(),
    };
  }
  return {
    year,
    month,
    date: daysTable[month],
    day: new Date(year, month - 1, daysTable[month]).getDay(),
  };
}

export default correctOverflowDate;
