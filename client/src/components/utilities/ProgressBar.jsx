import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function ProgressBar({ value }) {
  const returnColor = (val) => {
    if (val < 30) {
      return 'error'
    } else if (val < 75) {
      return 'secondary'
    } else {
      return 'success'
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mx: 2, mt: 1 }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={value} color={returnColor(value)} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar

// {...props}