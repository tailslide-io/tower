import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material/index';
import { palette } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteApp, updateApp } from '../../features/apps/appsReducer';

function ClientApplicationCard({ app }) {
  const dispatch = useDispatch();
  const [appTitle, setAppTitle] = useState(app.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  // const fetchAppFlags = (appId) => {
  //   dispatch(fetchFlagsByAppId(appId));
  // };
  // const handleDeleteApp = (appId) => {
  //   dispatch(deleteApp(appId));
  // };

  // const handleGetAppById = (appId) => {
  //   dispatch(fetchAppById(appId));
  // };
  // TODO: Fix cannot delete app when it is first created, app is undefined
  const handleDeleteApp = () => dispatch(deleteApp(app.id));
  const handleEditingTitle = (e) => {
    // e.stopPropagation();
    e.preventDefault();
    setIsEditingTitle(true);
  };
  const handleUpdateAppTitle = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    const body = { title: appTitle };
    dispatch(updateApp({ appId: app.id, body, callback: clearInput }));
  };
  const clearInput = () => {
    setIsEditingTitle(false);
  };

  return (
    // <Link component={NavLink} to={`./${app.id}`}>
    //   <ListItem
    //     key={app.title}
    //     onClick={() => handleFetchFlagsByAppId(app.id, dispatch)}
    //   >
    //     <ListItemText primary={app.title} />
    //     <Button onClick={() => handleDeleteApp(app.id, dispatch)}>
    //       Delete App
    //     </Button>
    //     <Button onClick={() => handleGetAppById(app.id, dispatch)}>
    //       Get App Info
    //     </Button>
    //   </ListItem>
    // </Link>

    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={handleEditingTitle}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDeleteApp}>
            <DeleteIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        component={NavLink}
        to={`./${app.id}`}
        sx={{
          '&:hover': {
            backgroundColor: isEditingTitle
              ? 'transparent'
              : palette({ bgColor: 'secondary' }),
          },
        }}
      >
        {isEditingTitle ? (
          <TextField
            value={appTitle}
            onChange={(e) => setAppTitle(e.target.value)}
            onKeyDown={handleUpdateAppTitle}
            onClick={(e) => e.preventDefault()}
            autoComplete="off"
            onBlur={() => setIsEditingTitle(false)}
          />
        ) : (
          <ListItemText
            primary={appTitle}
            // secondary={`${active}/${total} Flags Active`}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default ClientApplicationCard;
