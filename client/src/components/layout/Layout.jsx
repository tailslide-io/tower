import { Container, Grid, Toolbar } from '@mui/material/index';
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardAppBar from './DashBoardAppBar';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          <DashboardAppBar />
          <Toolbar />
          <Container>
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Layout;
