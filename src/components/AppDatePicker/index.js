import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const AppDatePicker = props => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      format="MM/dd/yyyy"
      margin="normal"
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
      {...props}
    />
  </MuiPickersUtilsProvider>
);

export default AppDatePicker;
