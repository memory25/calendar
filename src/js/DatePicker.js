import React, {useState, useCallback} from 'react';
import correctOverflowDate from 'utils/correctOverflowDate';
import generateDaysTable from 'utils/generateDaysTable';
import NAVIGATIONCONST from 'constant/NAVIGATIONCONST';

/*
 * @param {useState} navigationState - [navigation, setNavigation]
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
 *
 * @param {boolean} isOpenCalendar
 * @param {function} setIsOpenCalendar
 * @arg {boolean} isOpenCalendar
 */
function DatePicker({
  navigationState,
  selectDateState,
  currentViewYear,
  currentViewMonth,
  setCurrentViewYear,
  setCurrentViewMonth,
  isOpenCalendar,
  setIsOpenCalendar,
}) {
  const daysTable = generateDaysTable(currentViewYear);
  const setNavigation = navigationState[1];
  const [selectDate, setSelectDate] = selectDateState;
  const handleYearChange = useCallback(
    e => {
      const year = Number(e.target.value);
      const isValid = year >= 1000 && year <= 9999;
      if (!isValid) return null;
      setNavigation(pre =>
        pre === NAVIGATIONCONST.YEAR ? NAVIGATIONCONST.MONTH : pre
      );
      setCurrentViewYear(year);
      setCurrentViewMonth(selectDate.month);
      setSelectDate(pre =>
        correctOverflowDate(
          {
            year,
            month: pre.month,
          },
          pre
        )
      );
    },
    [selectDate]
  );
  const handleMonthChange = useCallback(
    e => {
      const month = Number(e.target.value);
      if (!(month >= 1 && month <= 12)) return null;
      setNavigation(pre =>
        pre === NAVIGATIONCONST.MONTH ? NAVIGATIONCONST.DATE : pre
      );
      setCurrentViewYear(selectDate.year);
      setCurrentViewMonth(month);
      setSelectDate(pre =>
        correctOverflowDate(
          {
            year: pre.year,
            month,
          },
          pre
        )
      );
    },
    [selectDate]
  );
  const handleDateChange = useCallback(
    e => {
      const date = Number(e.target.value);
      if (!(date >= 1 && date <= daysTable[currentViewMonth])) return null;

      setCurrentViewYear(selectDate.year);
      setCurrentViewMonth(selectDate.month);
      setSelectDate(pre => ({
        ...pre,
        date,
        day: new Date(currentViewYear, currentViewMonth - 1, date).getDay(),
      }));
    },
    [selectDate]
  );

  const [isDatePickerFocus, setIsDatePickerFocus] = useState(false);
  const handleDatePickerFocus = useCallback(e => {
    setIsDatePickerFocus(true);
  }, []);
  const handleDatePickerBlur = useCallback(e => {
    setIsDatePickerFocus(false);
  }, []);
  const toggleCalendar = useCallback(() => {
    setIsOpenCalendar(pre => !pre);
  }, []);

  return (
    <div
      id="datePicker"
      className={isDatePickerFocus && isOpenCalendar ? 'isFocus' : undefined}
      onFocus={handleDatePickerFocus}
      onBlur={handleDatePickerBlur}
    >
      <button onClick={toggleCalendar} style={{cursor: 'pointer'}}>
        {isOpenCalendar ? 'on' : 'off'}
      </button>
      <input
        type="text"
        value={selectDate.year}
        onChange={handleYearChange}
        disabled={!isOpenCalendar}
      />
      -
      <input
        type="text"
        value={
          selectDate.month >= 10 ? selectDate.month : `0${selectDate.month}`
        }
        onChange={handleMonthChange}
        disabled={!isOpenCalendar}
      />
      -
      <input
        type="text"
        value={selectDate.date >= 10 ? selectDate.date : `0${selectDate.date}`}
        onChange={handleDateChange}
        disabled={!isOpenCalendar}
      />
    </div>
  );
}

export default DatePicker;
