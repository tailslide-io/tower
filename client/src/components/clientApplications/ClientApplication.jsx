import { Divider, List } from '@mui/material';
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
    <List>
      {flags.map((flag) => (
        <>
          <FlagCard key={flag.id} flag={flag} />
          <Divider />
        </>
      ))}
    </List>
  );
}

export default ClientApplication;
