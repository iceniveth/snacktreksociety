import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { useTheme } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import {
  getWeek,
  getYear,
  getDay,
  differenceInMinutes,
  addSeconds,
  differenceInSeconds,
} from 'date-fns';
import {
  withAttendanceContext,
  useAttendanceContext,
} from '../../contexts/AttendanceContext';
import { AppContext } from '../../contexts/AppContext';
import { AuthContext } from '../../contexts/AuthContext';
import AppDatePicker from '../../components/AppDatePicker';
import AppTimePicker from '../../components/AppTimePicker';

const Attendance = () => {
  const theme = useTheme();
  const attendanceContext = useAttendanceContext();
  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);

  const nowOfSelectedDate = date => {
    const now = new Date();
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      selectedDate.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );
  };

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTimeIn, setSelectedTimeIn] = useState(null);
  const [selectedTimeOut, setSelectedTimeOut] = useState(null);
  const timeLogs = attendanceContext.timeLogs
    .map(t => ({
      ...t,
      week: getWeek(t.dateTimeIn),
      year: getYear(t.dateTimeIn),
      yearWeek: `${getYear(t.dateTimeIn)} - ${getWeek(t.dateTimeIn)}`,
    }))
    .reverse();
  const yearWeek = timeLogs
    .map(t => t.yearWeek)
    .filter((t, i, logs) => logs.indexOf(t) === i);
  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };
  const handleClick = asyncCallback => async () => {
    if (appContext.isLoading) return;
    try {
      appContext.startLoading();
      await asyncCallback();
    } finally {
      appContext.stopLoading();
    }
  };
  const { uid } = authContext.user;
  const handleTimeInClick = handleClick(async () => {
    const dateTimeIn = nowOfSelectedDate(selectedDate);
    await attendanceContext.setTimeIn({
      userId: uid,
      dateTimeIn,
      dateTimeOut: selectedTimeOut,
    });
    setSelectedTimeIn(dateTimeIn);
  });
  const handleTimeOutClick = handleClick(async () => {
    const dateTimeOut = nowOfSelectedDate(selectedDate);
    await attendanceContext.setTimeOut({
      userId: uid,
      dateTimeOut,
    });
    setSelectedTimeOut(dateTimeOut);
  });
  const handleDateChange = async dateTime => {
    setSelectedDate(dateTime);
    const timeLog = await attendanceContext.getTimeLogByDate({
      userId: uid,
      dateTime,
    });
    setSelectedTimeIn(timeLog.dateTimeIn ? timeLog.dateTimeIn.toDate() : null);
    setSelectedTimeOut(
      timeLog.dateTimeOut ? timeLog.dateTimeOut.toDate() : null
    );
  };
  const handleTimeChange = callback => async dateTime => {
    if (appContext.isLoading) return;
    try {
      appContext.startLoading();
      await callback(dateTime);
    } finally {
      appContext.stopLoading();
    }
  };

  useEffect(() => {
    const loadTimeLogs = async () => {
      appContext.startLoading();
      try {
        await handleDateChange(today);
      } finally {
        appContext.stopLoading();
      }
    };
    loadTimeLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const diffHoursAndMinutes = (dateTimeOut, dateTimeIn) => {
    const diffInMinutes = differenceInMinutes(dateTimeOut, dateTimeIn);
    const hours = parseInt(diffInMinutes / 60, 10);
    const minutes = diffInMinutes % 60;
    return {
      hours,
      minutes,
      hourAndMinute: `${`00${hours}`.slice(-2)}:${`00${minutes}`.slice(-2)}`,
    };
  };

  const timeLogsByYearWeek = yw =>
    timeLogs
      .filter(t => t.yearWeek === yw)
      .map(t => {
        const { dateTimeOut, dateTimeIn } = t;
        const { hours, minutes, hourAndMinute } = diffHoursAndMinutes(
          dateTimeOut,
          dateTimeIn
        );
        return {
          ...t,
          missingTimeOut: t.dateTimeOut,
          hours,
          minutes,
          differenceInSeconds: differenceInSeconds(t.dateTimeOut, t.dateTimeIn),
          diff: hourAndMinute,
        };
      });
  const sumTimeLogsOfYearWeek = yw => {
    const { startDateTime, endDateTime } = timeLogsByYearWeek(yw).reduce(
      (acc, log) => {
        const hasTimeOut = log.missingTimeOut != null;
        const calculate = val => {
          const { startDateTime, endDateTime } = val;
          return {
            startDateTime,
            endDateTime: addSeconds(endDateTime, log.differenceInSeconds),
          };
        };
        return hasTimeOut ? calculate(acc) : acc;
      },
      {
        startDateTime: new Date(),
        endDateTime: new Date(),
      }
    );
    const { hourAndMinute } = diffHoursAndMinutes(endDateTime, startDateTime);
    return hourAndMinute;
  };

  const hasTimedIn = selectedTimeIn != null;
  const hasTImedOut = selectedTimeOut != null;

  return (
    <Container maxWidth="sm">
      <Typography variant="subtitle2" style={{ color: grey[500] }}>
        Time In / Time Out
      </Typography>
      <Paper style={{ padding: theme.spacing(2) }}>
        <Grid container justify="center" alignItems="stretch" spacing={2}>
          <Grid item xs={12}>
            <AppDatePicker
              autoOk
              fullWidth
              label="Selected Date"
              disableFuture
              variant="outlined"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                {hasTimedIn ? (
                  <AppTimePicker
                    fullWidth
                    showTodayButton
                    label="Time In"
                    value={selectedTimeIn}
                    onChange={handleTimeChange(async dateTimeIn => {
                      await attendanceContext.setTimeIn({
                        userId: uid,
                        dateTimeIn,
                        dateTimeOut: selectedTimeOut,
                      });
                      setSelectedTimeIn(dateTimeIn);
                    })}
                  />
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    onClick={handleTimeInClick}
                  >
                    Time In
                  </Button>
                )}
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'center' }}>
                {!hasTimedIn ? (
                  <Icon style={{ paddingTop: theme.spacing(1) }}>remove</Icon>
                ) : hasTImedOut ? (
                  <AppTimePicker
                    fullWidth
                    showTodayButton
                    label="Time Out"
                    value={selectedTimeOut}
                    onChange={handleTimeChange(async dateTimeOut => {
                      await attendanceContext.setTimeOut({
                        userId: uid,
                        dateTimeOut,
                      });
                      setSelectedTimeOut(dateTimeOut);
                    })}
                  />
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    fullWidth
                    onClick={handleTimeOutClick}
                  >
                    Time Out
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <br />
      {yearWeek.map(yw => (
        <Fragment key={yw}>
          <Typography
            variant="subtitle2"
            style={{ color: grey[500], paddingBottom: theme.spacing(1) }}
          >
            {yw}
          </Typography>
          <Paper>
            <List style={{ padding: 0 }}>
              {timeLogsByYearWeek(yw).map((t, idx) => (
                <Fragment key={`f-${idx}`}>
                  <ListItem button>
                    <ListItemText
                      primary={
                        <Fragment>
                          {t.dateTimeIn.toLocaleDateString()}
                          {/* <span style={{ color: grey[500], paddingLeft: 10 }}>01-02-19</span>   */}
                          &nbsp;&nbsp;&nbsp;
                          <span style={{ color: grey[500] }}>
                            {days[getDay(t.dateTimeIn)]}
                          </span>
                          <span style={{ float: 'right' }}>
                            {t.missingTimeOut ? (
                              <span>{t.diff}</span>
                            ) : (
                              <span>Missing Time Out</span>
                            )}
                          </span>
                        </Fragment>
                      }
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              ))}
              <ListItem>
                <ListItemText>
                  <strong>Total</strong>
                  <span style={{ float: 'right' }}>
                    <strong>{sumTimeLogsOfYearWeek(yw)}</strong>
                  </span>
                </ListItemText>
              </ListItem>
            </List>
          </Paper>
          <br />
        </Fragment>
      ))}
    </Container>
  );
};

export default withRouter(withAttendanceContext(Attendance));
