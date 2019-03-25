import React, {useMemo} from 'react';

/*
 * @param {object} today
 * @param {number} today.year
 * @param {number} today.month
 * @param {number} today.day
 * @param {number} today.date
 *
 * @param {number} currentViewYear
 *
 * @param {function} handleYearClick
 * @arg {number} year
 */
function Years({today, currentViewYear, handleYearClick}) {
  const yearsList = useMemo(() => {
    const floor = Math.floor(currentViewYear / 10) * 10;
    const list = [];
    for (let year = floor - 1; year <= floor + 10; year += 1) {
      list.push(year);
    }
    return list;
  }, [currentViewYear]);

  return (
    <div id="years" className="calendarBody">
      {yearsList.map((year, i) => (
        <div className="btnWrap" key={`year${year}`}>
          <button
            className={today.year === year ? 'today' : ''}
            style={{color: i === 0 || i === 11 ? '#eee' : null}}
            onClick={handleYearClick(year)}
          >
            {year}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Years;
