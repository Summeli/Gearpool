import React from 'react';

const CalendarExplanation: React.FunctionComponent = () => {

  return (
    <div className="calendar-explanations">
        <div className="no-reservation">free</div>
        <div className="reserved-by-me">my reservation</div>
        <div className="reserved-by-oks">taken</div>

    </div>);

};

export default CalendarExplanation;
