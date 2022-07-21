import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { handleFetchFlagsByAppId } from '../../lib/handlers';

import FlagCard from '../flags/FlagCard';

function ClientApplication() {
  const dispatch = useDispatch();
  let { appId } = useParams();
  appId = Number(appId);
  const flags = useSelector((state) => state.flags).filter(
    (flag) => flag.app_id === appId
  );

  useEffect(() => {
    handleFetchFlagsByAppId(appId, dispatch);
  }, [dispatch, appId]);

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {flags.map((flag) => (
          <FlagCard key={flag.id} flag={flag} />
        ))}
      </Stack>
    </Box>
  );
}

export default ClientApplication;
