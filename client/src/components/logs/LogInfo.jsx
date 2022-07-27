import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogs } from '../../features/logs/logsReducer';
import LogsTable from './LogsTable';

function LogInfo() {
  const dispatch = useDispatch();

  const logs = useSelector((state) => state.logs);
  const [filterLogs, setFilterLogs] = useState(logs)

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  useEffect(() => {
    setFilterLogs(logs)
  }, [logs])

  if (!logs) return null;

  const handleFilter = (type) => {
    if (type === 'all') {
      setFilterLogs(logs)
      return
    }

    let filteredLogs = logs.filter(log => {
      return log.action_type === type
    })

    setFilterLogs(filteredLogs)
  }
  
  return <LogsTable logs={filterLogs} handleFilter={handleFilter} />;
}

export default LogInfo;
