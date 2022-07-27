import React, { useState } from 'react';
import { Box, Paper, Container, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TestChart from 'components/utilities/TestChart';
import TestChart2 from 'components/utilities/TestChart2';
import TestChart3 from 'components/utilities/TestChart3';
import BarChartIcon from '@mui/icons-material/BarChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';

function FlagTimeSeries() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const [graph, setGraph] = useState('line')

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  if (!selectedFlag) return null;

  return (
    <Container maxWidth='md' sx={{ mt: 2 }}>
      <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 2 } }}>
        <Typography variant="h5">
            {selectedFlag.title} Data
        </Typography>
          {graph === 'line'
            ? <TestChart2 />
            : <TestChart />
          }
        <Box display='flex' justifyContent='right'>
          <IconButton onClick={() => setGraph('line')} color='primary'>
            <SsidChartIcon fontSize='large'/>
          </IconButton>
          <IconButton onClick={() => setGraph('bar')} color='primary'>
            <BarChartIcon fontSize='large'/>
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}

export default FlagTimeSeries;
