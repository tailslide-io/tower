import React from 'react';
import { Toolbar, AppBar, Typography } from '@mui/material';

const drawerWidth = 240;

function DashboardAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      elevation={1}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
        Dashboard
      </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardAppBar;
