import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  ListItem,
  Grid,
  Typography,
} from '@mui/material';
import ProgressBar from 'components/utilities/ProgressBar';
import FlagSwitch from 'components/utilities/FlagSwitch';
import { deleteFlagById, toggleFlagById, updateFlagById } from 'features/flags/flagsReducer';
import TimeAgo from 'javascript-time-ago';
import { objectKeysCamelToSnake } from 'lib/utils';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FlagForm from './FlagForm';
import { useNavigate } from "react-router-dom";
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';

const FlagInfoCard = ({ flag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [openFlagForm, setOpenFlagForm] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  const handleOpenDeleteConfirm = () => {
    setOpenDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteConfirm(false);
  };

  const handleOpenFlagForm = () => setOpenFlagForm(true);

  const handleCloseFlagForm = () => {
    setOpenFlagForm(false);
  };

  const afterDeleteCallback = () => {
    handleCloseDeleteConfirm()
    navigate(`/apps`)
  }

  const handleOnFlagUpdate = (flagData, callback) => {
    flagData = objectKeysCamelToSnake(flagData);
    const { id, ...flagWithoutId } = flagData;
    dispatch(
      updateFlagById({ flagId: id, body: flagWithoutId, callback: handleCloseFlagForm })
    );
  };

  const handleDeleteFlag = () => {
    dispatch(
      deleteFlagById({ flagId: flag.id, callback: afterDeleteCallback})
    )
  }

  const handleToggleFlagActivity = () => {
    dispatch(
      toggleFlagById({ flagId: flag.id, body: { is_active: !flag.isActive } })
    );
  };

  const circuitState = (flag) => {
    switch (flag.circuitStatus) {
      case 'close':
        return (
          <Grid container direction="row" alignItems="center" component="span">
              <CircuitCloseIcon color='success' sx={{mr:1}}/> Circuit Closed
          </Grid>
        )
      case 'recovery':
        return (
          <Grid container direction="row" alignItems="center" component="span">
              <CircuitOpenIcon color='secondary' sx={{mr:1}}/> Circuit Recovering
          </Grid>
        )
      case 'open':
        return (
          <Grid container direction="row" alignItems="center" component="span">
              <CircuitOpenIcon color='error' sx={{mr:1}}/> Circuit Open
          </Grid>
        )
      default:
        break;
    }
  }

  const timeCreated = new Date(flag.createdAt).toLocaleDateString();
  const timeAgo = new TimeAgo('en-US').format(new Date(flag.updatedAt));

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Card elevation={1} sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Grid container spacing={0}>
          <Grid item xs={10} sm={10} sx={{mb: 2}}>
            <Typography variant="h4">
              {flag.title}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2}>
            <FlagSwitch
              size="medium"
              checked={flag.isActive}
              onChange={handleToggleFlagActivity}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
            <Typography>{flag.description}</Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{mb: 2}}>
            <Typography variant='body2' color="text.secondary">
              {`Flag Created: ${timeCreated}`}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{mb: 2}}>
            <Typography variant='body2' align='right' color="text.secondary">
              {`Last Updated: ${timeAgo}`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider sx={{ mt: 0, mb: 2 }}>Flag Info</Divider>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ mb: 1 }}>
            <Typography variant="body1">App Id:</Typography>
            <Typography variant="body1" color="text.secondary">
              {`${flag.appId}`}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ mb: 1 }}>
            <Typography variant="body1" align="right">
              Rollout Percentage:
            </Typography>
            <Typography variant="body1" align="right" color="text.secondary">
              {`${flag.rolloutPercentage}%`}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ mb: 1 }}>
            <Typography variant="body1">Flag Id:</Typography>
            <Typography variant="body1" color="text.secondary">
              {`${flag.id}`}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} sx={{ mb: 1 }}>
            <Typography variant="body1" align="right">
              Error Threshold:
            </Typography>
            <Typography variant="body1" align="right" color="text.secondary">
              {`${flag.errorThresholdPercentage}%`}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1">Whitelisted Users:</Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              {flag.whiteListedUsers
                ? flag.whiteListedUsers.split(',').join(', ')
                : 'None'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1">Webhook URLs:</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            {flag.webhooks
              ? (
                flag.webhooks.split(',').map((url, idx) => (
                  <ListItem key={idx} disableGutters disablePadding sx={{ my: 1 }}>
                    <Typography component="span" variant="caption" color="text.secondary" noWrap>
                      {url}
                    </Typography>
                  </ListItem>
                ))
              )
              : (
                <Typography variant="body2" color="text.secondary">
                  'None'
                </Typography>
              )
            }
          </Grid>
          <Grid item xs={12} sm={12}>
            <Divider sx={{ mt: 2, mb: 2 }}>Circuit Info</Divider>
          </Grid>
          {flag.isRecoverable ? (
            <>
              <Grid item xs={12} sm={6} sx={{ mb: 1 }}>
                <Typography variant="body1">Circuit State:</Typography>
                <Typography variant="body1" color="text.secondary">
                  {/* {`${flag.circuitStatus}`} */}
                  {/* {circuitState(flag.circuitStatus)} */}
                  <Grid container direction="row" alignItems="center" component="span">
                      <CircuitOpenIcon viewBox='0 0 24 24' fontSize='large' color='error' sx={{mr:1}}/> Circuit Open
                  </Grid>
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
              <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                <Typography variant="body1">Circuit Health:</Typography>
                <ProgressBar value={flag.circuitRecoveryPercentage} />
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
        <Button
          type="button"
          variant="contained"
          onClick={handleOpenFlagForm}
          sx={{ mt: 3, ml: 0 }}
        >
          Edit
        </Button>
        <Button
            type="button"
            variant="contained"
            color='error'
            onClick={handleOpenDeleteConfirm}
            sx={{ mt: 3, ml: 1 }}
          >
            Delete
        </Button>
      </Card>
      <Dialog open={openFlagForm} onClose={handleCloseFlagForm} scroll="body">
        <FlagForm
          callback={handleCloseFlagForm}
          flag={flag}
          formActionLabel="Save"
          formAction={handleOnFlagUpdate}
        />
      </Dialog>
      <Dialog
        open={openDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Deleting Flag: ${flag.title}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this flag?  This action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteConfirm}>Cancel</Button>
          <Button onClick={handleDeleteFlag} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FlagInfoCard;
