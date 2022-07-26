import { Box, Grid, Input, InputAdornment, Slider, Typography } from '@mui/material';
import React from 'react';

const SliderWithLabel = ({
  title,
  percentage,
  minPercent,
  tag,
  setter,
  formFields,
}) => {
  // const [thresholdValue, setThresholdValue] = useState(property);
  const handleSliderChange = (event, newValue) => {
    setter({
      ...formFields,
      [tag]: newValue,
    });
  };

  const handleInputChange = (event) => {
    setter({
      ...formFields,
      [tag]: event.target.value,
    });
  };

  const handleBlur = () => {
    if (percentage < 0) {
      setter({
        ...formFields,
        [tag]: 0,
      });
    } else if (percentage > 100) {
      setter({
        ...formFields,
        [tag]: 100,
      });
    }
  };

  return (
    <Box>
      <Typography id="input-slider" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof percentage === 'number' ? percentage : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={minPercent}
            step={5}
          />
        </Grid>
        <Grid item>
          <Input
            sx={{ width: '60px' }}
            value={percentage}
            size="small"
            id={tag}
            onChange={handleInputChange}
            onBlur={handleBlur}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            inputProps={{
              step: 5,
              min: minPercent,
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
export default SliderWithLabel;
