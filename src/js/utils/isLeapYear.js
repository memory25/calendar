/*
 * @param {number} year
 * @returns {boolean}
 */
function isLeap(year) {
  if (
    (year % 4 === 0 && year % 100 !== 0) ||
    (year % 400 === 0 && year % 3200 !== 0)
  ) {
    return true;
  }
  return false;
}

export default isLeap;
