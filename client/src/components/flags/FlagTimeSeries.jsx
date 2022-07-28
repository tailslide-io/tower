import React, { useState, useEffect } from 'react';
import { Box, Paper, Container, IconButton, Typography, Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TestChart from 'components/utilities/TestChart';
import TestChart2 from 'components/utilities/TestChart2';
import TestChart4 from 'components/utilities/TestChart4';
import BarChartIcon from '@mui/icons-material/BarChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import apiClient from 'lib/apiClient';
import LineChart from 'components/utilities/LineChart';
import BarChart from 'components/utilities/BarChart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';
import AddIcon from '@mui/icons-material/Add';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { fetchFlagTimeSeriesDataUrl } from 'constants/apiRoutes';

function FlagTimeSeries() {
  let { flagId } = useParams();
  flagId = Number(flagId);
  

  const [graph, setGraph] = useState('line')
  const [graphData, setGraphData] = useState([])
  const [timeRange, setTimeRange] = useState(600000)
  const [timeBucket, setTimeBucket] = useState(60000)
  const [windowString, setWindowString] = useState('10 Minutes')
  const [isLive, setIsLive] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );
  useEffect(() => {
    const controller = new AbortController();
    const dataUrl = fetchFlagTimeSeriesDataUrl(flagId);
    let timeoutId;
    if (isLive){
      (async function pollTimeSeriesData() {
        try {
          const data = await apiClient.fetchFlagTimeSeriesData(
            dataUrl,
            timeRange,
            timeBucket,
            controller.signal
          );
  
          setGraphData(data);
        } catch {}
        if (isLive) {
          timeoutId = setTimeout(pollTimeSeriesData, timeBucket);
        }
      })();
    } else {
      (async ()=>{
        try {
          const data = await apiClient.fetchFlagTimeSeriesData(dataUrl, timeRange, timeBucket, controller.signal)
          setGraphData(data)
        } catch (err){
          console.log(err)
        }
      })()
    }
   
    return () => {
      clearTimeout(timeoutId)
      controller.abort();
    };
  }, [flagId, isLive, timeBucket, timeRange]);

  const updateWindowHandler = async (time) => {
    if (time === '10min') {
      setTimeRange(600000);
      setTimeBucket(30000);
      setWindowString('10 Minutes');
    } else if (time === '30s') {
      setTimeRange(30000);
      setTimeBucket(3000);
      setWindowString('30 Seconds');
    } else {
      setTimeRange(3600000);
      setTimeBucket(180000);
      setWindowString('1 hour');
    }
  };

  if (!graphData) return null;
  if (!selectedFlag) return null;
  
  const timestamps = graphData.map(data => new Date(data.timestamp).toLocaleTimeString('en-US', { timeStyle:'short', hour12: false }))
  const successData = graphData.map(data => data.success)
  const failureData = graphData.map(data => data.failure)
  const errorRates = graphData.map((data) => {
    // if no data at all
    if (!data.failure && !data.succuess) {
      return undefined;
    }

    // if no failure, error rate must be 0
    if (!data.failure) {
      return 0;
    }

    // there is some failure, but no success, so error rate 100
    if (!data.success) {
      return 100;
    }

    let errorRate = (data.failure / (data.failure + data.success)) * 100;
    if (errorRate > selectedFlag.errorThresholdPercentage) {
      errorRate = selectedFlag.errorThresholdPercentage;
    }
    return errorRate;
  });

  return (
    <Container maxWidth='md' sx={{ mt: 2 }}>
      <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Grid container>
          <Grid item sm={6} sx={{ my: 'auto' }}>
            <Box display='flex' >
            <Typography variant="h5">
              {selectedFlag.title} Data
            </Typography>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                variant="outlined"
                startIcon={<SsidChartIcon fontSize="large" />}
                sx={{ mr: 1 }}
                onClick={() => setGraph('line')}
                color={graph === 'line' ? 'secondary' : 'primary'}
              >
                Err Rate
              </Button>
              <Button
                variant="outlined"
                startIcon={<BarChartIcon fontSize="large"/>}
                sx={{ mr: 1 }}
                onClick={() => setGraph('bar')}
                color={graph === 'bar' ? 'secondary' : 'primary'}
              >
                Requests
              </Button>
            </Box>
          </Grid>
        </Grid>
        {graph === 'line'
          ? <LineChart 
              timestamps={timestamps}
              successData={successData}
              failureData={failureData}
              errorRates={errorRates}
              threshold={selectedFlag.errorThresholdPercentage}
              windowString={windowString}
              showMore={showMore}
            />
          : <BarChart
              timestamps={timestamps}
              successData={successData}
              failureData={failureData}
              errorRates={errorRates}
              threshold={selectedFlag.errorThresholdPercentage}
              windowString={windowString}
              showMore={showMore}
            />
        }
        <Grid container>
          <Grid item sm={6} sx={{ my: 'auto' }}>
            <Box display='flex' >
            <Button
                variant="outlined"
                startIcon={<AccessTimeIcon fontSize="large" />}
                sx={{ mr: 1 }}
                onClick={() => {
                  updateWindowHandler('30s');
                }}
                disabled={isLive}
              >
                30s
              </Button>
              <Button
                variant="outlined"
                startIcon={<AccessTimeIcon fontSize="large" />}
                sx={{ mr: 1 }}
                onClick={() => {
                  updateWindowHandler('10min');
                }}
                disabled={isLive}
              >
                10m
              </Button>
              <Button
                variant="outlined"
                startIcon={<AccessTimeIcon />}
                sx={{ mr: 1 }}
                onClick={() => {
                  updateWindowHandler(`1hr`);
                }}
                disabled={isLive}
              >
                1h
              </Button>
              <Button
                variant="outlined"
                startIcon={<UpdateIcon />}
                onClick={() => setIsLive(!isLive)}
                color={isLive ? 'error' : 'primary'}
              >
                {isLive ? 'Stop' : 'Live'}
              </Button>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box display='flex' justifyContent='flex-end'>
              <Button
                variant="outlined"
                startIcon={showMore ? <UnfoldLessIcon /> : <AddIcon />}
                onClick={() => setShowMore(!showMore)}
                color={showMore ? 'error' : 'primary'}
              >
                {showMore ? 'Show Less' : 'Show More'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default FlagTimeSeries;
