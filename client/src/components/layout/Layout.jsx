import { Box, Toolbar } from '@mui/material/index';
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardAppBar from './DashBoardAppBar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <DashboardAppBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
