import { deleteApp, fetchAppById } from '../features/apps/appsReducer';
import {
  fetchFlagById,
  fetchFlagsByAppId,
  updateFlagById,
} from '../features/flags/flagsReducer';
import { fetchLogs } from '../features/logs/logsReducer';

// apps
const handleDeleteApp = (appId, dispatch) => {
  dispatch(deleteApp(appId));
};

const handleGetAppById = (appId, dispatch) => {
  dispatch(fetchAppById(appId));
};

// flags
const handleFetchFlagsByAppId = (appId, dispatch) => {
  dispatch(fetchFlagsByAppId(appId));
};

const handleToggleFlagActivity = (thunkInput, dispatch) => {
  dispatch(updateFlagById(thunkInput));
};

const handleFetchFlagById = (flagId, dispatch) => {
  dispatch(fetchFlagById(flagId));
};

// logs
const handleFetchLogs = (dispatch) => {
  dispatch(fetchLogs());
};
