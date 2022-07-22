import { Box, Divider, List } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchFlagsByAppId } from '../../features/flags/flagsReducer';
import FlagCard from '../flags/FlagCard';

function ClientApplication() {
  const dispatch = useDispatch();
  let { appId } = useParams();
  appId = Number(appId);
  const flags = useSelector((state) => state.flags).filter(
    (flag) => flag.app_id === appId
  );

  useEffect(() => {
    dispatch(fetchFlagsByAppId(appId));
  }, [dispatch, appId]);
  const sortedFlags = flags
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <List>
      {sortedFlags.map((flag) => (
        <Box key={flag.id}>
          <FlagCard flag={flag} />
          <Divider />
        </Box>
      ))}
    </List>
  );
}

export default ClientApplication;
