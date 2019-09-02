import React, { useState, createContext, useContext, useEffect } from 'react';
import { db } from '../api/firebase';
import { useAuthContext } from './AuthContext';

const AttendanceContext = createContext({});

const AttendanceContextProvider = ({ children }) => {
  const authContext = useAuthContext();
  const [timeLogsCount, setTimeLogsCount] = useState(10);
  const [timeLogs, setTimeLogs] = useState([]);

  const generateId = ({ userId, dateTime }) =>
    `${userId}-${dateTime.toISOString().slice(0, 10)}`;
  const toTimeLog = data =>
    data == null
      ? { dateTimeIn: null, dateTimeOut: null, userId: null, id: null }
      : {
          dateTimeIn: data.dateTimeIn == null ? null : data.dateTimeIn.toDate(),
          dateTimeOut:
            data.dateTimeOut == null ? null : data.dateTimeOut.toDate(),
          userId: data.user.id,
          id: data.id,
        };

  useEffect(() => {
    const unsubscribe = db.attendances
      .where('user.id', '==', authContext.user.uid)
      .orderBy('dateTimeIn')
      .limit(timeLogsCount)
      .onSnapshot(spTimeLogs => {
        const timeLogs = spTimeLogs.docs.map(log =>
          toTimeLog({ ...log.data(), id: log.id })
        );
        setTimeLogs(timeLogs);
      });
    return () => {
      unsubscribe();
    };
  }, [timeLogsCount, authContext.user.uid]);

  const value = {
    timeLogs,
    setTimeLogsCount,
    async setTimeIn({ userId, dateTimeIn, dateTimeOut }) {
      const id = generateId({ userId, dateTime: dateTimeIn });
      const log = {
        user: {
          id: userId,
        },
        dateTimeIn,
        dateTimeOut,
      };
      await db.attendances.doc(id).set(log);
    },
    async setTimeOut({ userId, dateTimeOut }) {
      const id = generateId({ userId, dateTime: dateTimeOut });
      await db.attendances.doc(id).update({
        dateTimeOut,
      });
    },
    async getTimeLogByDate({ userId, dateTime }) {
      const id = generateId({
        userId,
        dateTime,
      });
      const sp = await db.attendances.doc(id).get();
      const data = sp.data();
      const timeLog =
        data == null
          ? { dateTimeIn: null, dateTimeOut: null, user: null }
          : {
              dateTimeIn: data.dateTimeIn,
              dateTimeOut: data.dateTimeOut,
              user: { id: userId },
            };
      return timeLog;
    },
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

const withAttendanceContext = Component => props => (
  <AttendanceContextProvider>
    <Component {...props} />
  </AttendanceContextProvider>
);

const useAttendanceContext = () => useContext(AttendanceContext);

export { withAttendanceContext, useAttendanceContext };
