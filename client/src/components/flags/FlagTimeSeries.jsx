import React, { useState, useEffect } from 'react';
import { Box, Paper, Container, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TestChart from 'components/utilities/TestChart';
import TestChart2 from 'components/utilities/TestChart2';
import TestChart3 from 'components/utilities/TestChart3';
import BarChartIcon from '@mui/icons-material/BarChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import apiClient from 'lib/apiClient';
import LineChart from 'components/utilities/LineChart';
import BarChart from 'components/utilities/BarChart';

function FlagTimeSeries() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const [graph, setGraph] = useState('line')
  const [graphData, setGraphData] = useState([])
  const [windowString, setWindowString] = useState('10 Minutes')

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  useEffect(() => {
    async function fetch10minData() {
      const data = await apiClient.fetchTimeSeries(flagId, '600000', '60000')
      setGraphData(data)
    }

    fetch10minData()
  }, [flagId])

  const updateWindowHandler = (window) => {

  }

  if (!graphData) return null;
  if (!selectedFlag) return null;
  
  const timestamps = graphData.map(data => new Date(data.timestamp).toLocaleTimeString('en-US', { timeStyle:'short', hour12: false }))
  const successData = graphData.map(data => data.success)
  const failureData = graphData.map(data => data.failure)
  const errorRates = graphData.map(data => data.failure / (data.failure + data.success) * 100)

  return (
    <Container maxWidth='md' sx={{ mt: 2 }}>
      <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 2 } }}>
        <Typography variant="h5">
            {selectedFlag.title} Data
        </Typography>
          {graph === 'line'
            ? <LineChart 
                timestamps={timestamps}
                successData={successData}
                failureData={failureData}
                errorRates={errorRates}
                threshold={selectedFlag.errorThresholdPercentage}
                windowString={windowString}
              />
            : <BarChart
                timestamps={timestamps}
                successData={successData}
                failureData={failureData}
                errorRates={errorRates}
                threshold={selectedFlag.errorThresholdPercentage}
                windowString={windowString}
              />
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
