import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UpdateIcon from '@mui/icons-material/Update';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import BarChart from 'components/utilities/BarChart';
import LineChart from 'components/utilities/LineChart';
import { fetchFlagTimeSeriesDataUrl } from 'constants/apiRoutes';
import apiClient from 'lib/apiClient';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircuitCard from './CircuitCard';

function FlagTimeSeries() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const [graph, setGraph] = useState('line');
  const [graphData, setGraphData] = useState([]);
  const [timeRange, setTimeRange] = useState(30000);
  const [timeBucket, setTimeBucket] = useState(3000);
  const [windowString, setWindowString] = useState('30 Seconds');
  const [isLive, setIsLive] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );
  useEffect(() => {
    const controller = new AbortController();
    const dataUrl = fetchFlagTimeSeriesDataUrl(flagId);
    let timeoutId;
    if (isLive) {
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
      (async () => {
        try {
          const data = await apiClient.fetchFlagTimeSeriesData(
            dataUrl,
            timeRange,
            timeBucket,
            controller.signal
          );
          setGraphData(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }

    return () => {
      clearTimeout(timeoutId);
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

  const timestamps = graphData.map((data) =>
    new Date(data.timestamp).toLocaleTimeString('en-US', {
      timeStyle: timeBucket < 60000 ? 'medium' : 'short',
      hour12: false,
    })
  );
  const successData = graphData.map((data) => data.success);
  const failureData = graphData.map((data) => data.failure);
  const errorRates = graphData.map((data) => {
    // if no data at all
    if (!data.failure && !data.succuess) {
      return undefined;
    }

    // if no failure, error rate must be 0
    if (!data.failure) {
      return 0;
    }

    let errorRate = (data.failure / (data.failure + data.success)) * 100;
    if (errorRate > selectedFlag.errorThresholdPercentage) {
      errorRate = selectedFlag.errorThresholdPercentage;
    }
    return errorRate;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Paper sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Grid container>
          <Grid item sm={6} sx={{ my: 'auto' }}>
            <Box display="flex">
              <Typography variant="h5">{selectedFlag.title} Data</Typography>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box display="flex" justifyContent="flex-end">
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
                startIcon={<BarChartIcon fontSize="large" />}
                sx={{ mr: 1 }}
                onClick={() => setGraph('bar')}
                color={graph === 'bar' ? 'secondary' : 'primary'}
              >
                Requests
              </Button>
            </Box>
          </Grid>
        </Grid>
        {graph === 'line' ? (
          <LineChart
            timestamps={timestamps}
            successData={successData}
            failureData={failureData}
            errorRates={errorRates}
            threshold={selectedFlag.errorThresholdPercentage}
            windowString={windowString}
            showMore={showMore}
          />
        ) : (
          <BarChart
            timestamps={timestamps}
            successData={successData}
            failureData={failureData}
            errorRates={errorRates}
            threshold={selectedFlag.errorThresholdPercentage}
            windowString={windowString}
            showMore={showMore}
          />
        )}
        <Grid container>
          <Grid item sm={6} sx={{ my: 'auto' }}>
            <Box display="flex">
              <Button
                variant="outlined"
                startIcon={<AccessTimeIcon fontSize="large" />}
                sx={{ mr: 1 }}
                onClick={() => {
                  updateWindowHandler('30s');
                }}
                color={windowString === '30 Seconds' ? 'secondary' : 'primary'}
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
                color={windowString === '10 Minutes' ? 'secondary' : 'primary'}
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
                color={windowString === '1 hour' ? 'secondary' : 'primary'}
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
            <Box display="flex" justifyContent="flex-end">
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
      <CircuitCard flag={selectedFlag} />
    </Container>
  );
}

export default FlagTimeSeries;
