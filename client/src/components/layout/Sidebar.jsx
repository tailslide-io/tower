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
            padding: '8px',
            margin: 'auto',
          }}
          alt="Tailslide"
          src={Logo}
        />
      </Toolbar>
      <Divider />
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton component={NavLink} to="/apps">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Logs" disablePadding>
          <ListItemButton component={NavLink} to="/logs">
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Authorization" disablePadding>
          <ListItemButton component={NavLink} to="/auth">
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
