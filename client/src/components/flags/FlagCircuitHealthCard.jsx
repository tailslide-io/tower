import React from 'react'
import {
  Card,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import ProgressBar from 'components/utilities/ProgressBar';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';
import FlagSwitch from 'components/utilities/FlagSwitch';
import { toggleFlagById } from 'features/flags/flagsReducer';
import { useDispatch } from 'react-redux';

const CircuitCard = ({ flag }) => {
  const dispatch = useDispatch();

  const handleToggleFlagActivity = () => {
    dispatch(
      toggleFlagById({ flagId: flag.id, body: { is_active: !flag.isActive } })
    );
  };

  const circuitState = (state) => {
    switch (state) {
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
      <Card elevation={1} sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Grid container spacing={0}>
        <Grid item xs={11} sm={11}>
            <Typography variant="h5">
              Circuit Info
            </Typography>
          </Grid>
          <Grid item xs={1} sm={1}>
            <FlagSwitch
              size="medium"
              checked={flag.isActive}
              onChange={handleToggleFlagActivity}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider sx={{ mt: 2, mb: 2 }} variant='middle'/>
          </Grid>
          {flag.isRecoverable ? (
            <>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1">Circuit State:</Typography>
                <Typography variant="body1" color="text.secondary">
                  {circuitState(flag.circuitStatus)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1" align="right">
                  Recovery Profile:
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="right"
                >
                  {`${flag.circuitRecoveryProfile}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1">Recovery Delay:</Typography>
                <Typography variant="body1" color="text.secondary">
                  {`${flag.circuitRecoveryDelay} ms`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1" align="right">
                  Initial Recovery:
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="right"
                >
                  {`${flag.circuitInitialRecoveryPercentage}%`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1">Recovery Rate:</Typography>
                <Typography variant="body1" color="text.secondary">
                  {`${flag.circuitRecoveryRate} ms`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1" align="right">
                  Recovery Increment:
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="right"
                >
                  {`${flag.circuitRecoveryIncrementPercentage}%`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="body1">Circuit Health:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} sx={{ mb: 1, px: 3 }}>
                <ProgressBar value={flag.circuitRecoveryPercentage}/>
              </Grid>
            </>
          ) : (
            <Grid item xs={12} sm={12}>
              <Typography variant="body2" color="text.secondary" align="center">
                Circuit Auto Recovery is disabled for this flag.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Card>
  );
};

export default CircuitCard