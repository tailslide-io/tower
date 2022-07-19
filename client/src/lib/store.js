import { configureStore } from '@reduxjs/toolkit';
import appsReducer from '../features/apps/appsReducer';
import flagsReducer from '../features/flags/flagsReducer';
import logsReducer from '../features/logs/logsReducer';

const store = configureStore({
  reducer: {
    apps: appsReducer,
    flags: flagsReducer,
    logs: logsReducer,
  },
});

export default store;
