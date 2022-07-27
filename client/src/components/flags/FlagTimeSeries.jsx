import { Box, Button, Container, Paper } from '@mui/material';
import TestChart from 'components/utilities/TestChart';
import TestChart3 from 'components/utilities/TestChart3';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFlagTimeSeriesDataUrl } from '../../constants/apiRoutes';
import apiClient from '../../lib/apiClient';

function FlagTimeSeries() {
  const { flagId } = useParams();
  const [graph, setGraph] = useState('line');

  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const [timeRange, setTimeRange] = useState(600000);
  const [timeBucket, setTimeBucket] = useState(60000);

  let intervalTime = 2000;
  let intervalID;

  useEffect(() => {
    const controller = new AbortController();
    if (!intervalID) {
      (async function fetchTimeSeriesData() {
        try {
          const dataUrl = fetchFlagTimeSeriesDataUrl(flagId);
          const data = await apiClient.fetchFlagTimeSeriesData(
            dataUrl,
            timeRange,
            timeBucket,
            controller.signal
          );

          setTimeSeriesData(data);
        } catch {}
        setTimeout(fetchTimeSeriesData, intervalTime);
      })();
    }

    return () => {
      clearInterval(intervalID);
      controller.abort();
    };
  }, [flagId, intervalID, intervalTime, timeBucket, timeRange]);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Box display="flex" justifyContent="center">
        <Button onClick={() => setGraph('line')}>Line</Button>
        <Button onClick={() => setGraph('bar')}>Bar</Button>
      </Box>
      <Paper sx={{ p: 1 }}>
        {graph === 'line' ? (
          <TestChart3 data={timeSeriesData} />
        ) : (
          <TestChart data={timeSeriesData} />
        )}
      </Paper>
    </Container>
  );
}

export default FlagTimeSeries;
