import React, { useState, useEffect } from 'react';
import { Box, Paper, Container, IconButton, Typography, Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TestChart from 'components/utilities/TestChart';
import TestChart2 from 'components/utilities/TestChart2';
import BarChartIcon from '@mui/icons-material/BarChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import apiClient from 'lib/apiClient';
import LineChart from 'components/utilities/LineChart';
import BarChart from 'components/utilities/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';

function FlagTimeSeries() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const [graph, setGraph] = useState('line')
  const [graphData, setGraphData] = useState([])
  const [windowValue, setWindowValue] = useState(600000)
  const [windowString, setWindowString] = useState('10 Minutes')
  const [isLive, setIsLive] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

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

  const updateWindowHandler = async (time) => {
    if (time === '10min') {
      setWindowValue(600000)
      setWindowString('10 Minutes')
    } else {
      setWindowValue(3600000)
      setWindowString('1 hour')
    }
    const bucket = windowValue / 10

    const data = await apiClient.fetchTimeSeries(flagId, String(windowValue), String(bucket))

    setGraphData(data)
  }

  const liveUpdateHandler = () => {
    if (isLive) {
      console.log(intervalId)
      console.log('clearing')
      clearInterval(intervalId)
      setIsLive(false)
      return
    }

    let interval = setInterval( async () => {
      const bucket = windowValue / 10
      const data = await apiClient.fetchTimeSeries(flagId, String(windowValue), String(bucket))
      setGraphData(data)
    }, 5000);

    setIntervalId(interval)
    setIsLive(true)
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
        <Grid container>
          <Grid item sm={6}>
            <Box display='flex'>
              <Button
                variant="outlined"
                startIcon={<AccessTimeIcon />}
                sx={{ mr: 1 }}
                onClick={() => {updateWindowHandler('10min')}}
              >
                10m
              </Button>
              <Button
                variant="outlined"
                startIcon={<AccessTimeIcon />}
                sx={{ mr: 1 }}
                onClick={() => {updateWindowHandler(`1hr`)}}
              >
                1h
              </Button>
              <Button
                variant="outlined"
                startIcon={<UpdateIcon />}
                onClick={() => {liveUpdateHandler()}}
              >
                {isLive ? 'Stop' : 'Live'}
              </Button>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box display='flex' justifyContent='flex-end'>
              <IconButton onClick={() => setGraph('line')} color='primary'>
                <SsidChartIcon fontSize='large'/>
              </IconButton>
              <IconButton onClick={() => setGraph('bar')} color='primary'>
                <BarChartIcon fontSize='large'/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default FlagTimeSeries;
