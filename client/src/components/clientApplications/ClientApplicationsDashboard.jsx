import { Button, List, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApp, fetchApps } from '../../features/apps/appsReducer';
import ClientApplicationCard from './ClientApplicationCard';
// import ClientApplication from './ClientApplication';
/*
  Get the apps
  Display name nicely

*/
function ClientApplicationsDashboard() {
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

  // const handleUpdateApp = (appId) => {
  //   const body = {};
  //   dispatch(updateApp({ appId, body }));
  // };

  const clearInputs = () => {
    setAppName('');
  };
  return (
    <>
      <List>
        {apps.map((app) => (
          <ClientApplicationCard key={app.id} app={app} />
        ))}
      </List>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={appName}
        onChange={(e) => setAppName(e.target.value)}
      />
      <Button onClick={handleCreateApp}>Create new app</Button>
    </>
  );
}

export default ClientApplicationsDashboard;
