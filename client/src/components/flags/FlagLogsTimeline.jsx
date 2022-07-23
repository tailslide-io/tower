import { Container, Paper } from '@mui/material';
import LogsTimeline from 'components/logs/LogsTimeline';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function FlagLogsTimeline() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const logs = useSelector((state) => state.logs).filter(
    (log) => log.flag_id === flagId
  );

  if (!logs) return null;

  // Sorting logs in descending order
  logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <LogsTimeline logs={logs} />
      </Paper>
    </Container>
  );
}

export default FlagLogsTimeline;
