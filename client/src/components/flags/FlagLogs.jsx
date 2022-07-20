import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Stack } from '../../../node_modules/@mui/material/index';
import LogCard from '../logs/LogCard';

function FlagLogs() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const logs = useSelector((state) => state.logs).filter(
    (log) => log.flag_id === flagId
  );
  console.log('🚀 ~ file: FlagLogs.jsx ~ line 15 ~ FlagLogs ~ logs', logs);

  if (!logs) return null;

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {logs.map((log) => (
            <LogCard key={log.log_id} log={log} />
          ))}
        </Stack>
      </Box>
    </>
  );
}

export default FlagLogs;

/*
import React from 'react';

function LogCard({ log }) {
  console.log('🚀 ~ file: LogCard.jsx ~ line 4 ~ LogCard ~ log', log);
  return (
    <>
      <div>Corresponding Flag: {log.flag_id}</div>
      <div>{log.action_type}</div>
      <div>{log.log_description}</div>
    </>
  );
}

export default LogCard;



*/
