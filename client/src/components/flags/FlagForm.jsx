import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import SliderWithLabel from '../utilities/SliderWithLabel';

const FlagForm = ({
  flag = {},
  formActionLabel = '',
  formAction,
  callback,
}) => {
  const [formFields, setFormFields] = useState(flag);

  const handleSubmit = (e) => {
    e.preventDefault();

    formAction(formFields);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        elevation={1}
        // variant="outlined"
        sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" gutterBottom>
            Flag Settings
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
          </Grid>
          <Divider
            variant="middle"
            sx={{ marginTop: '15px', marginBottom: '15px' }}
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
            <Grid item xs={12} sm={8}>
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
