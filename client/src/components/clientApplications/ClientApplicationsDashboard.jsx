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
    if (e.key !== 'Enter') {
      return;
    }
    const body = { title: appName };

    dispatch(createApp({ body, callback: clearInputs }));
  };

  const handleToggleAddForm = (e) => {
    e.preventDefault();
    showAdd === 'none' ? setShowAdd(null) : setShowAdd('none');
  };

  const clearInputs = () => {
    setAppName('');
    setShowAdd('none');
  };

  const sortedApps = apps
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <List>
        {sortedApps.map((app) => (
          <Box key={app.id}>
            <ClientApplicationCard app={app} />
            <Divider />
          </Box>
        ))}
        <ListItem key="addApp">
          <ListItemIcon>
            <IconButton
              type="submit"
              edge="start"
              aria-label="add"
              onClick={handleToggleAddForm}
              onSubmit={handleCreateApp}
            >
              <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
          </ListItemIcon>

          <ListItemText
            primary={
              // <TextField label="Add an App" variant="outlined" size="small"/>
              <Input
                placeholder="Add a new App"
                sx={{ display: showAdd }}
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                onKeyDown={handleCreateApp}
              />
            }
            display="none"
          ></ListItemText>
        </ListItem>
      </List>
    </>
  );
}

export default ClientApplicationsDashboard;
