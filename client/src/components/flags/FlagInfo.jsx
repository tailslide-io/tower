import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { handleFetchFlagById } from '../../lib/utils';

/*
  1. Get info about this flags (rom the URL -> useParams)
  2. Separate out the logs from the return flag so that
    flag only has information without logs (object destructuring, removing the logs property)
    - Use tab nav to swap between views (https://mui.com/material-ui/react-tabs/)
  
  // Nav Bar
    // Flag Info / TS Data / Logs
*/

function FlagInfo() {
  let { flagId } = useParams();
  flagId = Number(flagId);

  const selectedFlag = useSelector((state) => state.flags).find(
    (flag) => flag.id === flagId
  );

  if (!selectedFlag) return null;

  return (
    <>
      <div>Flag Title: {selectedFlag.title}</div>
      <div>App Id Number: {selectedFlag.app_id} </div>
      <div>Flag Description: {selectedFlag.description}</div>
      <div>Active Status: {selectedFlag.is_active}</div>
      <div>White-Listed Users: {selectedFlag.white_listed_users}</div>
      <div>Error Thresholds: {selectedFlag.error_threshold}</div>
    </>
  );
}

export default FlagInfo;
