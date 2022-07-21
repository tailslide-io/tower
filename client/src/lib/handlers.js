import { deleteApp, fetchAppById } from '../features/apps/appsReducer';
import {
  fetchFlagById,
  fetchFlagsByAppId,
} from '../features/flags/flagsReducer';
import { fetchLogs } from '../features/logs/logsReducer';

// apps
export const handleDeleteApp = (appId, dispatch) => {
  dispatch(deleteApp(appId));
};

export const handleGetAppById = (appId, dispatch) => {
  dispatch(fetchAppById(appId));
};

// flags
export const handleFetchFlagsByAppId = (appId, dispatch) => {
  dispatch(fetchFlagsByAppId(appId));
};

export const handleFetchFlagById = (flagId, dispatch) => {
  dispatch(fetchFlagById(flagId));
};

// logs
export const handleFetchLogs = (dispatch) => {
  dispatch(fetchLogs());
};
