import { matchPath, useLocation } from 'react-router-dom';
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

export const useRouteMatch = (patterns) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
};
