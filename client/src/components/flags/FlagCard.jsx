// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';

// const FlagCard = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
} from '@mui/material/';
import React from 'react';
import { NavLink } from 'react-router-dom';

function FlagCard({ flag }) {
  return (
    // <Link component={RouterLink} to={`/flags/${flag.id}`}>
    //   <Paper>
    //     <Typography variant="h6">{flag.title}</Typography>
    //   </Paper>
    // </Link>

    <Paper elevation={3}>
      <ListItem secondaryAction={<Switch />} disablePadding>
        <ListItemButton
          role={undefined}
          component={NavLink}
          to={`/flags/${flag.id}`}
        >
          <ListItemIcon>
            <FlagCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary={flag.title}
            secondary={flag.description ? flag.description : null}
          />
        </ListItemButton>
      </ListItem>
    </Paper>
  );
}

export default FlagCard;
