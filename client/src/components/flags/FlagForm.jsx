import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import SliderWithLabel from '../utilities/SliderWithLabel';
import MultiTagInput from 'components/utilities/MultiTagInput';

const FlagForm = ({
  flag = {},
  formActionLabel = '',
  formAction,
  callback,
}) => {
  const [formFields, setFormFields] = useState(flag);
  const [delayTime, setDelayTime] = useState('ms')
  const [intervalTime, setIntervalTime] = useState('ms')
  const [whitelistArr, setWhitelistArr] = useState(
    flag.whiteListedUsers.length === 0
      ? []
      : flag.whiteListedUsers.split(','))
  const [webhookArr, setWebhookArr] = useState(
      flag.webhooks.length === 0
      ? []
      : flag.webhooks.split(','))


  
  const convertDelay = () => {
    let time = formFields.circuitRecoveryDelay

    if (delayTime === 'secs') {
      return time / 1000
    } else if (delayTime === 'mins') {
      return time / 60000
    }

    return time
  }

  const convertRecovery = () => {
    let time = formFields.circuitRecoveryRate

    if (intervalTime === 'secs') {
      return time / 1000
    } else if (intervalTime === 'mins') {
      return time / 60000
    }

    return time
  }

  const handleDelayChange = (event) => {
    setDelayTime(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setIntervalTime(event.target.value);
  };

  const handleDelayInputChange = (e) => {
    let time = e.target.value

    if (delayTime === 'secs') {
      time = time * 1000
    } else if (delayTime === 'mins') {
      time = time * 60000
    }

    setFormFields({
      ...formFields,
      circuitRecoveryDelay: time,
    })
  }

  const handleIntervalInputChange = (e) => {
    let time = e.target.value

    if (delayTime === 'secs') {
      time = time * 1000
    } else if (delayTime === 'mins') {
      time = time * 60000
    }

    setFormFields({
      ...formFields,
      circuitRecoveryRate: time,
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newFlag = JSON.parse(JSON.stringify(formFields))
    newFlag.whiteListedUsers = whitelistArr.join(',')
    newFlag.webhooks = webhookArr.join(',')

    formAction(newFlag);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        elevation={1}
        sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" gutterBottom>
            {formActionLabel === 'Create' ? 'New Flag' : 'Flag Settings'}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                name="flagTitle"
                label="Flag Title"
                fullWidth
                autoComplete="off"
                variant="standard"
                value={formFields.title}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    title: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formFields.isActive}
                      onChange={() =>
                        setFormFields({
                          ...formFields,
                          isActive: !formFields.isActive,
                        })
                      }
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={
                    formFields.isActive ? (
                      <Typography variant="body2" color="green">
                        Flag is on
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="red">
                        Flag is off
                      </Typography>
                    )
                  }
                  labelPlacement="top"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="flagDescription"
                label="Flag Description"
                fullWidth
                autoComplete="off"
                variant="standard"
                defaultValue={formFields.description}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    description: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <SliderWithLabel
                title="Rollout Percentage"
                percentage={formFields.rolloutPercentage}
                minPercent={0}
                tag="rolloutPercentage"
                setter={setFormFields}
                formFields={formFields}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MultiTagInput title="Whitelisted Users" innerText="Add a UUID" setter={setWhitelistArr} values={whitelistArr}/>
            </Grid>
            <Grid item xs={12} sm={12}>
              <MultiTagInput title="Webhook URLs" innerText="Add a webhook URL" setter={setWebhookArr} values={webhookArr}/>
            </Grid>
          </Grid>
          <Divider
            variant="middle"
            sx={{ my: 4 }}
          />
          <Typography variant="h6" gutterBottom>
            Circuit Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel>Recovery Profile</FormLabel>
                <RadioGroup
                  row
                  value={formFields.circuitRecoveryProfile}
                  onChange={(e) =>
                    setFormFields({
                      ...formFields,
                      circuitRecoveryProfile: e.target.value,
                    })
                  }
                >
                  <FormControlLabel
                    value="linear"
                    control={<Radio />}
                    label="Linear"
                  />
                  <FormControlLabel
                    value="exponential"
                    control={<Radio />}
                    label="Exponential"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formFields.isRecoverable}
                      onChange={() =>
                        setFormFields({
                          ...formFields,
                          isRecoverable: !formFields.isRecoverable,
                        })
                      }
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label={
                    formFields.isRecoverable ? (
                      <Typography variant="body2" color="green">
                        Enabled
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="red">
                        Disabled
                      </Typography>
                    )
                  }
                  labelPlacement="top"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <SliderWithLabel
                title="Error Threshold"
                percentage={formFields.errorThresholdPercentage}
                minPercent={0}
                tag="errorThresholdPercentage"
                setter={setFormFields}
                formFields={formFields}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <SliderWithLabel
                title="Initial Recovery Percentage"
                percentage={formFields.circuitInitialRecoveryPercentage}
                minPercent={0}
                tag="circuitInitialRecoveryPercentage"
                setter={setFormFields}
                formFields={formFields}
              />
            </Grid>
            <Grid item xs={8}>
              <SliderWithLabel
                title="Recovery Increment Percentage"
                percentage={formFields.circuitRecoveryIncrementPercentage}
                minPercent={0.1}
                tag="circuitRecoveryIncrementPercentage"
                setter={setFormFields}
                formFields={formFields}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} sx={{mt: 1}}>
            <Grid item xs={3}>
              <TextField
                name="recoveryDelay"
                label="Recovery Delay"
                fullWidth
                autoComplete="off"
                variant="standard"
                value={convertDelay()}
                onChange={handleDelayInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                value={delayTime}
                onChange={handleDelayChange}
                variant='standard'
                sx={{mt: 2}}
              >
                <MenuItem value="ms">ms</MenuItem>
                <MenuItem value="secs">secs</MenuItem>
                <MenuItem value="mins">mins</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                name="recoveryRate"
                label="Recovery Rate"
                fullWidth
                autoComplete="off"
                variant="standard"
                value={convertRecovery()}
                onChange={handleIntervalInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                value={intervalTime}
                onChange={handleIntervalChange}
                variant='standard'
                sx={{mt: 2}}
              >
                <MenuItem value="ms">ms</MenuItem>
                <MenuItem value="secs">secs</MenuItem>
                <MenuItem value="mins">mins</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {}}
            sx={{ mt: 3, ml: 1 }}
          >
            {formActionLabel}
          </Button>
          <Button
            type="button"
            variant="contained"
            color="grey"
            onClick={callback}
            sx={{ mt: 3, ml: 1 }}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default FlagForm;
