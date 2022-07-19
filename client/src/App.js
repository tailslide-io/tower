import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createApp,
  deleteApp,
  fetchAppById,
  fetchApps,
} from './features/apps/appsReducer';
import { fetchFlagsByAppId } from './features/flags/flagsReducer';

function App() {
  // get the apps from the Redux store
  // display the apps' title
  // need to get all the apps from server, useEffect hook
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);

  const [appName, setAppName] = useState('');

  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  const handleCreateApp = (e) => {
    const body = { title: appName };

    dispatch(createApp({ body, callback: clearInputs }));
  };

  const fetchAppFlags = (appId) => {
    dispatch(fetchFlagsByAppId(appId));
  };

  const handleDeleteApp = (appId) => {
    dispatch(deleteApp(appId));
  };

  const handleGetAppById = (appId) => {
    dispatch(fetchAppById(appId));
  };

  // const handleUpdateApp = (appId) => {
  //   const body = {};
  //   dispatch(updateApp({ appId, body }));
  // };

  const clearInputs = () => {
    setAppName('');
  };

  return (
    <div className="App">
      <ul>
        {apps.map((app) => (
          <li key={app.title} onClick={() => fetchAppFlags(app.id)}>
            {app.title}
            <button onClick={() => handleDeleteApp(app.id)}>Delete App</button>
            <button onClick={() => handleGetAppById(app.id)}>
              Get App Info
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <button onClick={handleCreateApp}>Create new app</button>
    </div>
  );
}

export default App;
