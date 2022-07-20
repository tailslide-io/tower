import React from 'react';
import { Toolbar, AppBar } from '@mui/material';

const drawerWidth = 240;

function DashboardAppBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        {/* <Typography variant="h6" noWrap component="div">
        Dashboard
      </Typography> */}
      </Toolbar>
    </AppBar>
  );
}

export default DashboardAppBar;
