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
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { updateFlagById } from '../../features/flags/flagsReducer';
// import { updateFlagById } from '../../features/flags/flagsReducer';

/*
  Keep track of card's flag is_active state
  On Click, toggle the is_active state, and send an update to backend

*/
function FlagCard({ flag }) {
  const dispatch = useDispatch();
  const handleToggleFlagActivity = () => {
    dispatch(
      updateFlagById({ flagId: flag.id, body: { is_active: !flag.is_active } })
    );
  };

  return (
    // <Link component={RouterLink} to={`/flags/${flag.id}`}>
    //   <Paper>
    //     <Typography variant="h6">{flag.title}</Typography>
    //   </Paper>
    // </Link>

    <Paper elevation={1}>
      <ListItem
        secondaryAction={
          <Switch
            checked={flag.is_active}
            onChange={handleToggleFlagActivity}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        disablePadding
      >
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
