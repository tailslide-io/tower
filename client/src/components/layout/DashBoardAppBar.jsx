import React from 'react';
import { Toolbar, AppBar, Typography, Breadcrumbs, Link } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import FlightIcon from '@mui/icons-material/Flight';

const drawerWidth = 240;

function DashboardAppBar() {
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(Boolean);

  const upper = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      elevation={1}
    >
      <Toolbar>
        <Breadcrumbs aria-label="breadcrumb" separator={<FlightIcon fontSize='small' sx={{ transform:'rotate(90deg)'}}/>}>
        {pathnames.length 
          ? (<Link component={RouterLink} to="/apps" color="common.white">Home</Link>) 
          : (<Typography color="common.white"> Home </Typography>)
        }
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography color="common.white" key={name}>{upper(name)}</Typography>
          ) : (
            <Link color="common.white" key={name} component={RouterLink} to={routeTo}>
              {upper(name)}
            </Link>
          );
        })}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}

export default DashboardAppBar;
