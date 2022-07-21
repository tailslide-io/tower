import { Box, Toolbar } from '@mui/material/index';
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardAppBar from './DashBoardAppBar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Grid container spacing={4}> */}
      {/* <Grid item xs={2}> */}
      <Sidebar />
      <DashboardAppBar />

      {/* </Grid> */}
      {/* <Grid item xs={10}> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      {/* </Grid>
      </Grid> */}
    </Box>
  );
}

export default Layout;
