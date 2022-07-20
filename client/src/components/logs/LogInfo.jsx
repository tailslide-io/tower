import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchLogs } from '../../lib/utils';
import LogsCollection from './LogsCollection';

function LogInfo() {
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.logs);

  useEffect(() => {
    handleFetchLogs(dispatch);
  }, [dispatch]);

  if (!logs) return null;

  return <LogsCollection logs={logs} />;
}

export default LogInfo;
