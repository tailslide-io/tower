import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Dialog, Fab, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  createFlagByAppId,
  fetchFlagsByAppId,
} from '../../features/flags/flagsReducer';
import { defaultFlag, objectKeysCamelToSnake } from '../../lib/utils';
import FlagCard from '../flags/FlagCard';
import FlagForm from '../flags/FlagForm';
import FlagListHeader from '../flags/FlagListHeader';

function ClientApplication() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnFlagCreate = (flagData) => {
    flagData = objectKeysCamelToSnake(flagData);
    const { app_id, ...flagWithoutId } = flagData;
    dispatch(
      createFlagByAppId({
        appId: app_id,
        body: flagWithoutId,
        callback: handleClose,
      })
    );
  };

  const dispatch = useDispatch();
  let { appId } = useParams();

  appId = Number(appId);

  const flags = useSelector((state) => state.flags).filter(
    (flag) => flag.appId === appId
  );

  const sortedFlags = flags
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  const app = useSelector((state) => state.apps).find(
    (app) => app.id === appId
  );

  useEffect(() => {
    dispatch(fetchFlagsByAppId(appId));
  }, [dispatch, appId]);

  return (
    <Container>
      <FlagListHeader app={app} searchHandler={() => {}} />
      <Box>
        <Stack spacing={1}>
          {sortedFlags.map((flag) => (
            <FlagCard key={flag.id} flag={flag} />
          ))}
        </Stack>
      </Box>
      <Fab
        color="secondary"
        aria-label="add"
        size="medium"
        sx={{ mt: 2, ml: 1 }}
        onClick={handleOpen}
      >
        <AddIcon sx={{ color: 'white'}}/>
      </Fab>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <FlagForm
          callback={handleClose}
          flag={{ ...defaultFlag, appId }}
          formAction={handleOnFlagCreate}
          formActionLabel="Create"
        />
      </Dialog>
    </Container>
  );
}

export default ClientApplication;
