import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';

import 'roboto-fontface';
import 'material-design-icons/iconfont/material-icons.css';

const {
  StrictMode,
} = React;

ReactDOM.render(
  <StrictMode>
    <Calendar />
  </StrictMode>,
  document.getElementById('root')
);

