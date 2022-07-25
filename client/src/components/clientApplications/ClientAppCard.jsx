import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  Dialog,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from '@mui/material/index';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteApp, updateApp } from '../../features/apps/appsReducer';
import AppForm from './AppForm';

function ClientAppCard({ app }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteApp = () => dispatch(deleteApp(app.id));

  const handleUpdateAppTitle = ({ formAppTitle , appId}) => {
    const body = { title: formAppTitle };
    dispatch(updateApp({ appId: appId, body, callback: handleClose }));
  };

  return (
    <Card elevation={1}>
      <ListItem
        secondaryAction={
          <>
            <IconButton edge="end" aria-label="edit" onClick={handleOpen}>
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
        >
          <ListItemText
            primary={app.title}
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
      >
        <AppForm
          callback={handleClose}
          appTitle={app.title}
          appId={app.id}
          formAction={handleUpdateAppTitle}
          formActionLabel="Update"
        />
      </Dialog> 
    </Card>
  );
}

export default ClientAppCard;
