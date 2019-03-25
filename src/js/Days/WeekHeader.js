import React from 'react';

const WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function WeekHeader() {
  return (
    <div className="week">
      {WEEK.map(day => (
        <span key={`week${day}`}>{day}</span>
      ))}
    </div>
  );
}

export default WeekHeader;
