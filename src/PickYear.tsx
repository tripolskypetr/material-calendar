import React, { useState, useEffect, Fragment } from 'react';
import moment, { Moment } from 'moment';
import className from 'classnames';

import './PickYear.css';

const currentYear = new Date().getFullYear();

const PickYear = ({
  onChange = (e: Moment) => console.log({e}),
}) => {

  const [state, setState] = useState({
    year: '',
    month: '',
  });

  const TOTAL_YEARS = 100;

  const years = [...new Array(TOTAL_YEARS)]
    .map((...args) => args[1])
    .map((i) => moment().add(TOTAL_YEARS / 2, 'years').subtract(i, 'years'));

  const months = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
  ].map((m) => moment().month(m));

  const setYear = (year: string) => setState({month: state.month, year});
  const setMonth = (month: string) => setState({month, year: state.year});

  useEffect(() => {
    const {year, month} = state;
    if (year && month) {
      const date = moment().month(month).year(parseInt(year));
      onChange(date);
    }
  }, [state, onChange, state.year, state.month]);

  return (
    <div className="calendar-picker">
      {state.year === '' ? years.map((year: Moment) => (
        <div key={year.format('YYYY')} className={className("calendar-picker__chip", {
          'calendar-picker__chip--active': year.year() === currentYear
        })} onClick={() => setYear(year.format('YYYY'))}>
          {year.format('YYYY')}
        </div>
      )) : state.month === '' ? months.map((m) => (
        <div key={m.format('MMMM')} className="calendar-picker__chip" onClick={() => setMonth(m.format('MMMM'))}>
          {m.format('MMMM')}
        </div>
      )) : null}
    </div>
  );
}

export default PickYear;
