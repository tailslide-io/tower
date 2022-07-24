import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  Switch,
} from '@mui/material/';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleFlagById } from '../../features/flags/flagsReducer';
import TimeAgo from 'javascript-time-ago'

function FlagCard({ flag }) {
  const dispatch = useDispatch();
  const handleToggleFlagActivity = () => {
    dispatch(
      toggleFlagById({ flagId: flag.id, body: { is_active: !flag.isActive } })
    );
  };

  const timeAgo = new TimeAgo('en-US').format(new Date(flag.updatedAt))

  return (

    <Card elevation={1}>
      <ListItem
        secondaryAction={
          <Switch
            checked={flag.isActive}
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
            <FlagCircleIcon fontSize='large' color={flag.isActive ? 'success' : 'error'}/>
          </ListItemIcon>
          <ListItemText
            primary={flag.title}
            secondary={
              <>
                {`Updated: ${timeAgo}`}<br />
                {`Rollout: ${flag.rolloutPercentage}%`}<br />
                {`Circuit Breaking: ${flag.isRecoverable ? 'Enabled' : 'Disabled'}`}<br />
              </>

            }
          />
        </ListItemButton>
      </ListItem>
    </Card>
  );
}

export default FlagCard;
