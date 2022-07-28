import React from 'react';
import { useSelector } from 'react-redux';
import { Toolbar, AppBar, Typography, Breadcrumbs, Link } from '@mui/material';
import { useLocation, Link as RouterLink, useParams } from 'react-router-dom';
import FlightIcon from '@mui/icons-material/Flight';

const drawerWidth = 240;

function DashboardAppBar() {
  const { pathname } = useLocation();
  const { flagId } = useParams()

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === +flagId
  );

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
          ? (<Link component={RouterLink} to="/apps" color="common.white" underline="hover">Home</Link>) 
          : (<Typography color="common.white"> Home </Typography>)
        }
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          if (name === 'flags' && selectedFlag) {
            return (
              <Link underline="hover" color="common.white" key={name} component={RouterLink} to={`/apps/${selectedFlag.appId}`}>
                {upper(name)}
              </Link>
            )
          }

          return isLast ? (
            <Typography color="common.white" key={name}>{upper(name)}</Typography>
          ) : (
            <Link underline="hover" color="common.white" key={name} component={RouterLink} to={routeTo}>
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
