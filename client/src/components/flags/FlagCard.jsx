import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import {
  Box,
  Card,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material/';
import TimeAgo from 'javascript-time-ago';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleFlagById } from '../../features/flags/flagsReducer';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';

function FlagCard({ flag }) {
  const dispatch = useDispatch();
  const handleToggleFlagActivity = () => {
    dispatch(
      toggleFlagById({ flagId: flag.id, body: { is_active: !flag.isActive } })
    );
  };

  const timeAgo = new TimeAgo('en-US').format(new Date(flag.updatedAt));

  const circuitState = (flag) => {
    switch (flag.circuitStatus) {
      case 'close':
        return (
          <Grid container direction="row" alignItems="center">
              <CircuitCloseIcon color='success' sx={{mr:1}}/> Circuit Closed
          </Grid>
        )
      case 'recovery':
        return (
          <Grid container direction="row" alignItems="center">
              <CircuitOpenIcon color='secondary' sx={{mr:1}}/> Circuit Recovering
          </Grid>
        )
      case 'open':
        return (
          <Grid container direction="row" alignItems="center">
              <CircuitOpenIcon color='error' sx={{mr:1}}/> Circuit Open
          </Grid>
        )
      default:
        break;
    }
  }

  return (
    <Card elevation={1}>
      <ListItem
        secondaryAction={
          <Switch
            checked={flag.isActive}
            onChange={handleToggleFlagActivity}
            inputProps={{ 'aria-label': 'controlled' }}
            color="success"
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
            <FlagCircleIcon
              fontSize="large"
              color={flag.isActive ? 'success' : 'error'}
            />
          </ListItemIcon>
          <ListItemText
            primary={flag.title}
            secondary={
              <>
                {`Updated: ${timeAgo}`}
                <br />
                {`Rollout: ${flag.rolloutPercentage}%`}
                <br />
                {flag.isRecoverable
                  ? circuitState(flag)
                  : 'Circuit Disabled'
                }
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </Card>
  );
}

export default FlagCard;
