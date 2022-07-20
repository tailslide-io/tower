import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogsCollection from '../logs/LogsCollection';

function FlagLogs() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const logs = useSelector((state) => state.logs).filter(
    (log) => log.flag_id === flagId
  );

  if (!logs) return null;

  return <LogsCollection logs={logs} />;
}

export default FlagLogs;
