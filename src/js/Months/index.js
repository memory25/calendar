import React from 'react';
import MONTHCONST from 'constant/MONTHCONST';

/*
 * @param {object} today
 * @param {number} today.year
 * @param {number} today.month
 * @param {number} today.day
 * @param {number} today.date
 *
 * @param {number} currentViewYear
 *
 * @param {function} handleMonthClick
 * @arg {object} date
 * @param {number} date.year
 * @param {number} date.month
 */
function Months({today, currentViewYear, handleMonthClick}) {
  return (
    <div id="months" className="calendarBody">
      {Object.keys(MONTHCONST).map(month => (
        <div className="btnWrap" key={`month${month}`}>
          <button
            className={
              today.year === currentViewYear && today.month === Number(month)
                ? 'today'
                : ''
            }
            onClick={handleMonthClick({
              year: currentViewYear,
              month: Number(month),
            })}
          >
            {MONTHCONST[month]}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Months;

// selectMonth.year ===
