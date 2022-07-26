import React, { useState } from 'react';
import { Box, Paper, Container, Button } from '@mui/material';
import TestChart from 'components/utilities/TestChart';
import TestChart2 from 'components/utilities/TestChart2';
import TestChart3 from 'components/utilities/TestChart3';

function FlagTimeSeries() {
  const [graph, setGraph] = useState('line')

  return (
    <Container maxWidth='md' sx={{ mt: 2 }}>
      <Box display='flex' justifyContent='center'>
        <Button onClick={() => setGraph('line')}>
          Line
        </Button>
        <Button onClick={() => setGraph('bar')}>
          Bar
        </Button>
      </Box>
      <Paper sx={{ p: 1 }}>
        {graph === 'line'
          ? <TestChart3 />
          : <TestChart />
        }
      </Paper>
    </Container>
  );
}

export default FlagTimeSeries;
