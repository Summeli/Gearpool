import React from 'react';

const CalendarExplanation: React.FunctionComponent = () => {

  return (
    <div className="calendar-explanations">
        <div className="calendar-explanation calenno-reservation">free</div>
        <div className="calendar-explanation reserved-by-me">Me</div>
        <div className="calendar-explanation reserved-by-oks">taken</div>

    </div>);

};

export default CalendarExplanation;
