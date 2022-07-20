import { Button, ListItem, ListItemText } from '@mui/material/index';
import { fetchAppFlags, handleDeleteApp, handleGetAppById } from 'lib/utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function ClientApplicationCard({ app }) {
  const dispatch = useDispatch();
  // const fetchAppFlags = (appId) => {
  //   dispatch(fetchFlagsByAppId(appId));
  // };
  // const handleDeleteApp = (appId) => {
  //   dispatch(deleteApp(appId));
  // };

  // const handleGetAppById = (appId) => {
  //   dispatch(fetchAppById(appId));
  // };

  return (
    <Link to={`./${app.id}`}>
      <ListItem key={app.title} onClick={() => fetchAppFlags(app.id, dispatch)}>
        <ListItemText primary={app.title} />
        <Button onClick={() => handleDeleteApp(app.id, dispatch)}>
          Delete App
        </Button>
        <Button onClick={() => handleGetAppById(app.id, dispatch)}>
          Get App Info
        </Button>
      </ListItem>
    </Link>
  );
}

export default ClientApplicationCard;
