import React, {useCallback} from 'react';
import NAVIGATIONCONST from 'constant/NAVIGATIONCONST';
import Years from './Years';
import Months from './Months';
import Days from './Days';

/*
 * @param {useState} navigationState - [navigation, setNavigation]
 *
 * @param {object} today
 * @param {number} today.year
 * @param {number} today.month
 * @param {number} today.day
 * @param {number} today.date
 *
 * @param {useState} selectDateState - [selectDate, setSelectDate]
 *
 * @param {number} currentViewYear
 * @param {number} currentViewMonth
 *
 *
 * @param {function} setCurrentViewYear
 * @arg {number} year
 * @param {function} setCurrentViewMonth
 * @arg {number} month
 */
function CalendarBody({
  navigationState,
  today,
  selectDateState,
  currentViewYear,
  currentViewMonth,
  setCurrentViewYear,
  setCurrentViewMonth,
}) {
  const [navigation, setNavigation] = navigationState;
  const [selectDate, setSelectDate] = selectDateState;

  const handleYearClick = useCallback(
    year => () => {
      setCurrentViewYear(year);
      setNavigation(NAVIGATIONCONST.MONTH);
    },
    []
  );
  const handleMonthClick = useCallback(
    month => () => {
      setCurrentViewYear(month.year);
      setCurrentViewMonth(month.month);
      setNavigation(NAVIGATIONCONST.DATE);
    },
    []
  );
  const handleDayClick = useCallback(
    date => () => {
      setSelectDate(date);
    },
    []
  );

  if (navigation === NAVIGATIONCONST.YEAR) {
    return (
      <Years
        today={today}
        currentViewYear={currentViewYear}
        handleYearClick={handleYearClick}
      />
    );
  } else if (navigation === NAVIGATIONCONST.MONTH) {
    return (
      <Months
        today={today}
        currentViewYear={currentViewYear}
        handleMonthClick={handleMonthClick}
      />
    );
  }
  return (
    <Days
      today={today}
      selectDate={selectDate}
      currentViewYear={currentViewYear}
      currentViewMonth={currentViewMonth}
      handleDayClick={handleDayClick}
    />
  );
}

export default CalendarBody;
