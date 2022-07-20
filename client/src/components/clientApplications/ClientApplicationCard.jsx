import { Button, ListItem, ListItemText } from '@mui/material/index';
import Link from '@mui/material/Link';
import {
  handleDeleteApp,
  handleFetchFlagsByAppId,
  handleGetAppById,
} from 'lib/utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
    <Link component={NavLink} to={`./${app.id}`}>
      <ListItem
        key={app.title}
        onClick={() => handleFetchFlagsByAppId(app.id, dispatch)}
      >
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
