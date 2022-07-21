import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApp, fetchApps } from '../../features/apps/appsReducer';
import ClientApplicationCard from './ClientApplicationCard';

function ClientApplicationsDashboard() {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);

  const [appName, setAppName] = useState('');
  const [showAdd, setShowAdd] = useState('none');

  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  const handleCreateApp = (e) => {
    const body = { title: appName };

    dispatch(createApp({ body, callback: clearInputs }));
  };

  const handleToggleAddForm = (e) => {
    e.preventDefault();
    showAdd === 'none' ? setShowAdd(null) : setShowAdd('none');
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
          <Box key={app.id}>
            <ClientApplicationCard app={app} />
            <Divider />
          </Box>
        ))}
        <ListItem key="addApp">
          <ListItemIcon>
            <IconButton
              edge="start"
              aria-label="add"
              onClick={handleToggleAddForm}
            >
              <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
          </ListItemIcon>

          <ListItemText
            primary={
              // <TextField label="Add an App" variant="outlined" size="small"/>
              <Input placeholder="Add a new App" sx={{ display: showAdd }} />
            }
            display="none"
          ></ListItemText>
        </ListItem>
      </List>
    </>
  );
}

export default ClientApplicationsDashboard;
