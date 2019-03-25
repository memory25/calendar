import React, {useCallback, useMemo} from 'react';
import NAVIGATIONCONST from 'constant/NAVIGATIONCONST';
import MONTHCONST from 'constant/MONTHCONST';

function generateContent(navigation, currentViewYear, currentViewMonth) {
  if (navigation === 'YEAR') {
    const floor = Math.floor(currentViewYear / 10) * 10;
    return `${floor}-${floor + 9}`;
  } else if (navigation === 'MONTH') {
    return currentViewYear;
  }
  return `${MONTHCONST[currentViewMonth]} ${currentViewYear}`;
}

/*
 * @param {useState} navigationState - [navigation, setNavigation]
 * @param {number} currentViewYear
 * @param {number} currentViewMonth
 *
 * @param {function} setCurrentViewYear
 * @arg {number} year
 *
 * @param {function} setCurrentViewMonth
 * @arg {number} month
 */
function CalendarHead({
  navigationState,
  currentViewYear,
  currentViewMonth,
  setCurrentViewYear,
  setCurrentViewMonth,
}) {
  const [navigation, setNavigation] = navigationState;
  const arrowClickFn = useCallback(
    direction => () => {
      const isLeft = direction === 'LEFT';
      const isRight = !isLeft;
      if (navigation === NAVIGATIONCONST.YEAR) {
        setCurrentViewYear(preYear => preYear + (isLeft ? -10 : 10));
      } else if (navigation === NAVIGATIONCONST.MONTH) {
        setCurrentViewYear(preYear => preYear + (isLeft ? -1 : 1));
      } else if (navigation === NAVIGATIONCONST.DATE) {
        if (isLeft && currentViewMonth === 1) {
          setCurrentViewMonth(12);
          setCurrentViewYear(preYear => preYear - 1);
        } else if (isLeft) {
          setCurrentViewMonth(currentViewMonth - 1);
        } else if (isRight && currentViewMonth === 12) {
          setCurrentViewMonth(1);
          setCurrentViewYear(preYear => preYear + 1);
        } else if (isRight) {
          setCurrentViewMonth(currentViewMonth + 1);
        }
      }
    },
    [navigation, currentViewMonth, setCurrentViewMonth, setCurrentViewMonth]
  );

  const handleArrowLClick = useMemo(() => arrowClickFn('LEFT'));
  const handleArrowRClick = useMemo(() => arrowClickFn('RIGHT'));
  const handleContentClick = useCallback(() => {
    if (navigation === NAVIGATIONCONST.YEAR) {
      // TODO
    } else if (navigation === NAVIGATIONCONST.MONTH) {
      setNavigation(NAVIGATIONCONST.YEAR);
    } else {
      setNavigation(NAVIGATIONCONST.MONTH);
    }
  }, [navigation, setNavigation]);

  return (
    <div className="calendarHead">
      <button className="arrowL" onClick={handleArrowLClick} />
      <button className="content" onClick={handleContentClick}>
        {generateContent(navigation, currentViewYear, currentViewMonth)}
      </button>
      <button className="arrowR" onClick={handleArrowRClick} />
    </div>
  );
}

export default CalendarHead;
