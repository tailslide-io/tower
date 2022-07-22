import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { handleFetchFlagById } from '../../lib/utils';

/*
  1. Get info about this flags (rom the URL -> useParams)
  2. Separate out the logs from the return flag so that
    flag only has information without logs (object destructuring, removing the logs property)
    - Use tab nav to swap between views (https://mui.com/material-ui/react-tabs/)
  
  // Nav Bar
    // Flag Info / TS Data / Logs
*/

function FlagInfo() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  if (!selectedFlag) return null;

  return (
    <>
      <TestForm selectedFlag={selectedFlag} />
    </>
  );
  // <>
  //   <Box>
  //     {/* <FormControl component="fieldset">
  //       <FormGroup aria-label="position" row>
  //         <FormLabel
  //           component={<TextField />}
  //           // label="Flag Title"
  //           // labelPlacement="start"
  //         />
  //       </FormGroup>
  //     </FormControl> */}

  //     <Typography>Test</Typography>
  //     <TextField
  //       id="title"
  //       label="Flag Title"
  //       value={flagTitle}
  //       onChange={handleTitleChange}
  //     ></TextField>
  //     <TextField value={selectedFlag.description}></TextField>
  //   </Box>
  //   <Box>
  //     <Typography>White-Listed Users</Typography>
  //     <TextField></TextField>
  //   </Box>
  //   <Box>
  //     <Typography>Flag Status</Typography>
  //     <Switch />
  //   </Box>
  //   <Box>
  //     <Typography>Is Recoverable</Typography>
  //     <Switch />
  //   </Box>
  //   <Box>
  //     <SliderWithLabel
  //       title="Rollout Percentage"
  //       property={selectedFlag.rollout_percentage / 10}
  //     />
  //   </Box>
  //   <Box>
  //     <SliderWithLabel
  //       title="Error Threshold"
  //       property={selectedFlag.error_threshold_percentage / 10}
  //     />
  //   </Box>
  //   <Box>
  //     <SliderWithLabel
  //       title="Initial Circuit Recovery Percentage"
  //       property={selectedFlag.circuit_initial_recovery_percentage / 10}
  //     />
  //   </Box>
  //   <Box>
  //     <Typography>Recovery Delay</Typography>
  //     <TextField></TextField>
  //   </Box>
  //   <Box>
  //     <Typography>Recovery Rate</Typography>
  //     <TextField></TextField>
  //   </Box>
  //   <Box>
  //     <SliderWithLabel
  //       title="Recovery Increment Percentage"
  //       property={selectedFlag.circuit_recovery_increment_percentage / 10}
  //     />
  //   </Box>
  // </>
}

const TestForm = ({ selectedFlag }) => {
  const [flagTitle, setFlagTitle] = useState(selectedFlag.title);

  const handleTitleChange = (e) => {
    setFlagTitle(e.target.value);
  };

  const [flagDescription, setFlagDescription] = useState(
    selectedFlag.flag_description
  );

  const handleDescriptionChange = (e) => {
    setFlagDescription(e.target.value);
  };

  const [flagStatus, setFlagStatus] = useState(selectedFlag.is_active);

  const handleFlagStatusToggle = () => {
    setFlagStatus(!flagStatus);
  };

  const [recoverableStatus, setRecoverableStatus] = useState(
    selectedFlag.is_recoverable
  );

  const handleRecoverableStatusToggle = () => {
    setRecoverableStatus(!recoverableStatus);
  };

  return (
    <form onSubmit={() => {}}>
      <Grid
        container
        // alignItems="center"
        // justify="center"
        // direction="column"
        spacing={2}
        columns={12}
      >
        <Grid item xs={12}>
          <TextField
            id="name-input"
            name="name"
            label="Flag Name"
            type="text"
            value={flagTitle}
            onChange={handleTitleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description-input"
            name="description"
            label="Description"
            type="text"
            value={flagDescription}
            onChange={handleDescriptionChange}
          />
        </Grid>
        <Grid>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={flagStatus}
                  onChange={handleFlagStatusToggle}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Flag Status"
            />
          </FormGroup>
        </Grid>
        <Grid>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={recoverableStatus}
                  onChange={handleRecoverableStatusToggle}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Is Recoverable?"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel>Recovery Profile</InputLabel>
            <Select
              name="Recovery Profile"
              value={selectedFlag.circuit_recovery_profile}
              onChange={() => {}}
            >
              <MenuItem key="exponential" value="exponential">
                Exponential
              </MenuItem>
              <MenuItem key="linear" value="linear">
                Linear
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <SliderWithLabel
            title="Rollout Percentage"
            property={selectedFlag.rollout_percentage / 10}
          />
        </Grid>
        <Grid item xs={12}>
          <SliderWithLabel
            title="Error Threshold"
            property={selectedFlag.error_threshold_percentage / 10}
          />
        </Grid>
        <Grid item xs={12}>
          <SliderWithLabel
            title="Initial Recovery Percentage"
            property={selectedFlag.circuit_initial_recovery_percentage / 10}
          />
        </Grid>
        <Grid item xs={12}>
          <SliderWithLabel
            title="Recovery Increment Percentage"
            property={selectedFlag.circuit_recovery_increment_percentage / 10}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const SliderWithLabel = ({ title, property }) => {
  const [thresholdValue, setThresholdValue] = useState(property);
  const handleSliderChange = (event, newValue) => {
    setThresholdValue(newValue);
  };

  const handleInputChange = (event) => {
    setThresholdValue(
      event.target.value === '' ? '' : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (thresholdValue < 0) {
      setThresholdValue(0);
    } else if (thresholdValue > 100) {
      setThresholdValue(100);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof thresholdValue === 'number' ? thresholdValue : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            sx={{ width: '42px' }}
            value={thresholdValue}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlagInfo;
