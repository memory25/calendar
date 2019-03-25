import React, {useMemo} from 'react';
import generateDaysList from 'utils/generateDaysList';
import WeekHeader from './WeekHeader';

/*
 * @param {object} today
 * @param {number} today.year
 * @param {number} today.month
 * @param {number} today.day
 * @param {number} today.date
 *
 * @param {object} selectDate
 * @param {number} selectDate.year
 * @param {number} selectDate.month
 * @param {number} selectDate.day
 * @param {number} selectDate.date
 * @param {Date} selectDate.Date
 *
 * @param {number} currentViewYear
 * @param {number} currentViewMonth
 *
 * @param {function} handleDayClick
 * @arg {object} date
 * @param {number} date.year
 * @param {number} date.month
 * @param {number} date.day
 * @param {number} date.date
 */
function Days({
  today,
  selectDate,
  currentViewYear,
  currentViewMonth,
  handleDayClick,
}) {
  const calendarDays = useMemo(
    () => generateDaysList(currentViewYear, currentViewMonth),
    [currentViewYear, currentViewMonth]
  );

  return (
    <div id="days" className="calendarBody">
      <WeekHeader />
      {calendarDays.map(date => (
        <div className="btnWrap" key={`${date.month}${date.date}`}>
          <button
            className={`
          ${
            today.year === date.year &&
            today.month === date.month &&
            today.date === date.date
              ? 'today'
              : ''
          }
          ${
            selectDate.year === date.year &&
            selectDate.month === date.month &&
            selectDate.date === date.date
              ? 'selectDate'
              : ''
          }
          ${currentViewMonth === date.month ? 'currentViewMonth' : ''}
          `}
            onClick={handleDayClick(date)}
          >
            {date.date}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Days;
