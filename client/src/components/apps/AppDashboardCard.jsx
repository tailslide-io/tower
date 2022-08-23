import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material/index';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';
import { fetchFlagsByAppId } from 'features/flags/flagsReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteApp, updateApp } from '../../features/apps/appsReducer';
import AppForm from './AppForm';

function ClientAppCard({ app }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const flags = useSelector((state) => state.flags).filter(
    (flag) => flag.appId === app.id
  );

  const activeFlags = flags.filter(flag => flag.isActive).length
  const totalFlags = flags.length
  const recoverFlags = flags.filter(flag => flag.isRecoverable)
  const recoverFlagsTotal = recoverFlags.length
  const flagsOpen = recoverFlags.filter(flag => flag.circuitStatus === 'open').length
  const flagsClose = recoverFlags.filter(flag => flag.circuitStatus === 'close').length
  const flagsRecovery = recoverFlags.filter(flag => flag.circuitStatus === 'recovery').length

  useEffect(() => {
    dispatch(fetchFlagsByAppId(app.id));
  }, [dispatch, app.id]);

  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

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
            <IconButton edge="end" aria-label="edit" onClick={handleOpen} color='primary'>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={handleOpenDeleteConfirm} color='error'>
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
            secondary={
              <>
                {activeFlags}/{totalFlags} Flags Active
                <br />
                {recoverFlagsTotal}/{totalFlags} Circuits Active
                <br />
                  <Grid container direction="row" alignItems="center" component="span">
                    <CircuitCloseIcon color='success' sx={{mr:1, my: 'auto'}}/>
                    {`${flagsClose}`}
                    <CircuitOpenIcon color='secondary' sx={{mx:1}}/> {flagsRecovery}
                    <CircuitOpenIcon color='error' sx={{mx:1}}/> {flagsOpen}
                  </Grid>
              </>
            }
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
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Deleting App: ${app.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this flag?  This action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDeleteApp} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
  );
}

export default ClientAppCard;
