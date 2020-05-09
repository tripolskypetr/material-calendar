import React, { useState, useCallback } from 'react';
import moment, { Moment } from 'moment';
import DayOfWeek from './DayOfWeek';

import './Calendar.css';
import PickYear from './PickYear';

interface Day {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}

interface Week {
  days: Day[]
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const generate = (now: Moment = moment()) => {
  const startDay = now.clone().startOf('month').startOf('week')
  const endDay = now.clone().endOf('month').endOf('week')
  const date = startDay.clone().subtract(1, 'day')
  const calendar = [];
  while (date.isBefore(endDay, 'day')) {
    calendar.push({
      days: Array(7)
        .fill(0)
        .map(() => {
          const value = date.add(1, 'day').clone()
          const active = moment().isSame(value, 'date')
          const disabled = !now.isSame(value, 'month')
          const selected = now.isSame(value, 'date')
          return {
            value, active, disabled, selected
          }
        })
    })
  }
  return calendar;
}

const updateSelectedDay = (day: Day, calendar: Week[]) => {
  calendar.forEach((week: Week) => week.days.forEach((d: Day) => {
    if (d.value.format('MMDD') === day.value.format('MMDD')) {
      d.selected = true;
    } else {
      d.selected = false;
    }
  }));
  return calendar;
}

const Calendar = ({
  now = moment(),
  onChange = (e: string) => console.log({e}),
}) => {

  const [state, setState] = useState({calendar: generate(now), now});
  const [pickYear, setPickYear] = useState(false);

  const go = (dir: number, day?: Day) => {
    const now = state.now.add(dir, 'month');
    const calendar = generate(now);
    setPickYear(false);
    if (day) {
      updateSelectedDay(day, calendar);
      onChange(day.value.format('MM-DD-YYYY'));
    }
    setState({ calendar, now });
  };

  const select = (day: Day) => {
    const {calendar, now} = state;
    updateSelectedDay(day, calendar);
    setState({calendar, now});
    onChange(day.value.format('MM-DD-YYYY'));
  };

  const pick = (now: Moment) => {
    setState({calendar: generate(now), now});
    setPickYear(false);
  };

  return (
    <div className="calendar">

      <div className="calendar__header">
        <div className="calendar__headerTitle">
          {state.now.format('MMMM YYYY')}
          <span className="material-icons calendar__headerControl--icon" onClick={() => setPickYear(true)}>keyboard_arrow_down</span>
        </div>
        <div className="calendar__fill" />
        <div className="calendar__headerControl">
          <span className="material-icons calendar__headerControl--icon" onClick={() => go(-1)}>keyboard_arrow_left</span>
          <span className="material-icons calendar__headerControl--icon" onClick={() => go(1)}>keyboard_arrow_right</span>
        </div>
      </div>

      {pickYear && <PickYear onChange={pick}/>}

      {!pickYear && (
        <div className="calendar__table">
          {days.map((day) => <div key={day} className="calendar__cell calendar__cell--header">{moment().day(day).format('ddd').substr(0, 1)}</div>)}
          {
            state.calendar.map((week: Week) => week.days.map((day: Day) => (
              <div key={day.value.format('MMDDYY')} className="calendar__cell">
                <DayOfWeek
                  onClick={() => {
                    if (day.disabled) {
                      go(day.value.date() > 15 ? -1 : 1, day);
                    } else {
                      select(day);
                    }
                  }}
                  active={day.active}
                  disabled={day.disabled}
                  selected={day.selected}
                  value={day.value}/>
              </div>
            )))
          }
        </div>
      )}

      <div className="calendar__fill" />

    </div>
  );
}

export default Calendar;
