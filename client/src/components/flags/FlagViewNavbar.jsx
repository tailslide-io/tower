import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useRouteMatch } from '../../lib/utils';

import { Box, Tab, Tabs } from '@mui/material';
import { useEffect } from 'react';
import { fetchFlagById } from '../../features/flags/flagsReducer';

function FlagsNavbar() {
  const { flagId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlagById(flagId));
  }, [dispatch, flagId]);

  const routeMatch = useRouteMatch([
    '/flags/:flagId/logs',
    '/flags/:flagId/circuit',
    '/flags/:flagId',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs value={currentTab} centered>
          <Tab
            label="Flag Info"
            value="/flags/:flagId"
            to={`/flags/${flagId}`}
            component={Link}
          />
          <Tab
            label="Logs"
            value="/flags/:flagId/logs"
            to={`/flags/${flagId}/logs`}
            component={Link}
          />
          <Tab
            label="Circuit Health"
            value="/flags/:flagId/circuit"
            to={`/flags/${flagId}/circuit`}
            component={Link}
          />
        </Tabs>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}
export default FlagsNavbar;
