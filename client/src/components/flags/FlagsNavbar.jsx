import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '../../../node_modules/@mui/material/index';
import { useRouteMatch } from '../../lib/utils';

import { useEffect } from 'react';
import { handleFetchFlagById } from '../../lib/handlers';

function FlagsNavbar() {
  const { flagId } = useParams();
  const dispatch = useDispatch();
  console.log('Flag navbar is being re-rendered');

  useEffect(() => {
    handleFetchFlagById(flagId, dispatch);
  }, [dispatch, flagId]);

  const routeMatch = useRouteMatch([
    '/flags/:flagId/logs',
    '/flags/:flagId/timeseries',
    '/flags/:flagId',
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={currentTab}>
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
            label="Time Series Data"
            value="/flags/:flagId/timeseries"
            to={`/flags/${flagId}/timeseries`}
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
