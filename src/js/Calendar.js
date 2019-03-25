import React, {useState, useMemo, useLayoutEffect} from 'react';
import NAVIGATIONCONST from 'constant/NAVIGATIONCONST';
import DatePicker from './DatePicker';
import CalendarHead from './CalendarHead';
import CalendarBody from './CalendarBody';

function Calendar({date = new Date(), onSelect}) {
  const today = useMemo(
    () => ({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      day: date.getDay(),
    }),
    [date]
  );
  const navigationState = useState(NAVIGATIONCONST.DATE);
  const selectDateState = useState(today);
  const [currentViewYear, setCurrentViewYear] = useState(today.year);
  const [currentViewMonth, setCurrentViewMonth] = useState(today.month);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);

  const selectDate = selectDateState[0];
  useLayoutEffect(() => {
    onSelect(selectDate);
  }, [selectDate]);

  return (
    <React.Fragment>
      <DatePicker
        navigationState={navigationState}
        selectDateState={selectDateState}
        currentViewYear={currentViewYear}
        currentViewMonth={currentViewMonth}
        setCurrentViewYear={setCurrentViewYear}
        setCurrentViewMonth={setCurrentViewMonth}
        isOpenCalendar={isOpenCalendar}
        setIsOpenCalendar={setIsOpenCalendar}
      />
      {isOpenCalendar && (
        <div id="calendar">
          <CalendarHead
            navigationState={navigationState}
            currentViewYear={currentViewYear}
            currentViewMonth={currentViewMonth}
            setCurrentViewYear={setCurrentViewYear}
            setCurrentViewMonth={setCurrentViewMonth}
          />
          <CalendarBody
            navigationState={navigationState}
            today={today}
            selectDateState={selectDateState}
            currentViewYear={currentViewYear}
            currentViewMonth={currentViewMonth}
            setCurrentViewYear={setCurrentViewYear}
            setCurrentViewMonth={setCurrentViewMonth}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default Calendar;
