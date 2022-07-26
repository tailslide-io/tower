import React from 'react';
import { Paper, Container } from '@mui/material';
import TestChart from 'components/utilities/TestChart';


function FlagTimeSeries() {
  return (
    <Container maxWidth='md' sx={{ mt: 2 }}>
      <Paper sx={{ p: 1 }}>
        <TestChart />
      </Paper>
    </Container>
  );
}

export default FlagTimeSeries;
