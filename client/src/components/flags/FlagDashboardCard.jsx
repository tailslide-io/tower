import {
  Card,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from '@mui/material/';
import TimeAgo from 'javascript-time-ago';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleFlagById } from '../../features/flags/flagsReducer';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';
import FlagSwitch from 'components/utilities/FlagSwitch';

function FlagCard({ flag }) {
  const theme = useTheme()
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
          <Grid container direction="row" alignItems="center" component="span">
              <CircuitCloseIcon fontSize='large' color='success' sx={{mr:1}}/> Circuit Closed
          </Grid>
        )
      case 'recovery':
        return (
          <Grid container direction="row" alignItems="center" component="span">
              <CircuitOpenIcon fontSize='large' color='secondary' sx={{mr:1}}/> Circuit Recovering
          </Grid>
        )
      case 'open':
        return (
          <Grid container direction="row" alignItems="center" component="span">
              <CircuitOpenIcon fontSize='large' color='error' sx={{mr:1}}/> Circuit Open
          </Grid>
        )
      default:
        break;
    }
  }

  return (
    <Card elevation={1}>
      <Grid container columns={36}>
        <Grid 
          item 
          sm={1} 
          bgcolor={flag.isActive ? theme.palette.success.light : theme.palette.error.light} />
        <Grid item sm={35}>
          <ListItem
            secondaryAction={
              <FlagSwitch
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
        </Grid>
      </Grid>
    </Card>
  );
}

export default FlagCard;
