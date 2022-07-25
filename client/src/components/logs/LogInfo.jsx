import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../../features/logs/logsReducer';
import LogsCollection from './LogsCollection';
import LogsTable from './LogsTable';

function LogInfo() {
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (!logs) return null;
  
  return <LogsTable logs={logs} />;
}

export default LogInfo;
