import React from 'react';
import './DayOfWeek.css';

import moment from 'moment';
import classNames from 'classnames';

const DayOfWeek = ({
  value = moment(),
  active = false,
  disabled = false,
  selected = false,
  ...otherProps
}) => (
  <p className={classNames("calendar-day__cell", {
    'calendar-day__cell--disabled': disabled,
    'calendar-day__cell--selected': selected,
    'calendar-day__cell--active': active,
  })} {...otherProps}>{value.format('DD')}</p>
);

export default DayOfWeek;
