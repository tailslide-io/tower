import React from 'react';
import { Box, Paper, Stack } from '../../../node_modules/@mui/material/index';
import LogCard from './LogCard';

function LogsCollection({ logs }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper>
        <Stack spacing={3} p={1}>
          {logs.map((log) => (
            <LogCard key={log.log_id} log={log} />
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}

export default LogsCollection;
