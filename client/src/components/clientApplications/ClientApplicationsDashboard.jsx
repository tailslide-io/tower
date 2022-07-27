import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Container,
  Dialog,
  Fab,
  Stack,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApp, fetchApps } from '../../features/apps/appsReducer';
import AppForm from './AppForm';
import ClientAppCard from './ClientAppCard';
import ClientApplicationHeader from './ClientApplicationHeader';

function ClientApplicationsDashboard() {
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.apps);

  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState('')


  useEffect(() => {
    dispatch(fetchApps());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateApp = ({ formAppTitle }) => {
    const body = { title: formAppTitle };

    dispatch(createApp({ body, callback: handleClose }));
  };

  const searchHandler = (e) => {
    setSearchString(e.target.value)
  }

  const filteredApps = apps.filter(app => {
    if (!searchString) {
      return app
    } else if (app.title.toLowerCase().includes(searchString.toLowerCase())) {
      return app
    }
  })

  const sortedApps = filteredApps
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Container>
      <ClientApplicationHeader searchHandler={searchHandler} searchString={searchString}/>
      <Box>
        <Stack spacing={1}>
          {sortedApps.map((app) => (
            <ClientAppCard key={app.id} app={app} />
          ))}
        </Stack>
      </Box>
      <Fab color="secondary" aria-label="add" size='medium' sx={{ mt: 2, ml: 1 }} onClick={handleOpen}>
        <AddIcon sx={{ color: 'white'}} />
      </Fab> 
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
      >
        <AppForm
          callback={handleClose}
          appTitle=''
          formAction={handleCreateApp}
          formActionLabel="Create"
        />
      </Dialog> 
    </Container>
  );
}

export default ClientApplicationsDashboard;
