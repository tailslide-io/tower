import { deleteApp, fetchAppById } from '../features/apps/appsReducer';
import { fetchFlagsByAppId } from '../features/flags/flagsReducer';

export const fetchAppFlags = (appId, dispatch) => {
  dispatch(fetchFlagsByAppId(appId));
};
export const handleDeleteApp = (appId, dispatch) => {
  dispatch(deleteApp(appId));
};

export const handleGetAppById = (appId, dispatch) => {
  dispatch(fetchAppById(appId));
};
