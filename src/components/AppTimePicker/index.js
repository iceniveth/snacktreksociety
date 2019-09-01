import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const AppTimePicker = props => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardTimePicker mask="__:__ _M" {...props} />
  </MuiPickersUtilsProvider>
);

export default AppTimePicker;
