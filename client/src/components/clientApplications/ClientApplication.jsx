import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  Dialog,
  Stack,
  Card,
  Typography,
  Fab,
  Container,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchFlagsByAppId } from '../../features/flags/flagsReducer';
import { defaultFlag } from '../../lib/utils';
import FlagCard from '../flags/FlagCard'
import FlagForm from '../flags/FlagForm';
import FlagListHeader from '../flags/FlagListHeader';


function ClientApplication() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  let { appId } = useParams();

  appId = Number(appId);
  const flags = useSelector((state) => state.flags).filter(
    (flag) => flag.appId === appId
  );

  const app = useSelector((state) => state.apps).find(
    (app) => app.id === appId
  );

  useEffect(() => {
    dispatch(fetchFlagsByAppId(appId));
  }, [dispatch, appId]);
  const sortedFlags = flags
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Container>
      <FlagListHeader app={app} searchHandler={() => {}}/>
      <Box>
        <Stack spacing={1}>
          {sortedFlags.map((flag) => (
            <FlagCard key={flag.id} flag={flag} />
          ))}
        </Stack>
      </Box>
      <Fab color="primary" aria-label="add" size='medium' sx={{ mt: 2, ml: 1 }} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
      >
        <FlagForm
          callback={handleClose}
          flag={{ ...defaultFlag, appId }}
          formAction={() => {}}
          formActionLabel="Create"
        />
      </Dialog> 
      {/* <List>
        {sortedFlags.map((flag) => (
          <Box key={flag.id}>
            <FlagCard flag={flag} />
            <Divider />
          </Box>
        ))}

        <ListItemIcon>
          <IconButton
            // component={Link}
            // to="newFlag"
            type="submit"
            edge="start"
            aria-label="add"
            onClick={handleOpen}
          >
            <AddCircleIcon color="primary" fontSize="large" />
          </IconButton>
        </ListItemIcon>
      </List>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
      >
        <FlagForm
          callback={handleClose}
          flag={{ ...defaultFlag, appId }}
          formAction={() => {}}
          formActionLabel="Create"
        />
      </Dialog> */}
    </Container>
  );
}

export default ClientApplication;
