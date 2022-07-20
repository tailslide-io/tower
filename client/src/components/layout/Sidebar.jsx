import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import Link from '@mui/material/Link';
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/graphic_color.svg';

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 64,
            padding: '5px',
            margin: 'auto',
          }}
          alt="Tailslide"
          src={Logo}
        />
      </Toolbar>
      <Divider />
      <List>
        <Link component={NavLink} to="/apps">
          <ListItem key="Dashboard" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem key="Logs" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Authorization" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary="Authorization" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
