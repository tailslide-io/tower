import { Container, Paper, Typography } from '@mui/material';
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

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  if (!logs) return null;
  if (!selectedFlag) return null;

  // Sorting logs in descending order
  logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        elevation={1}
        sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h5">
          {selectedFlag.title} Logs
        </Typography>
        <LogsTimeline logs={logs} flag={selectedFlag}/>
      </Paper>
    </Container>
  );
}

export default FlagLogsTimeline;
