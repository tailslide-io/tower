import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '../../../node_modules/@mui/material/index';

/*
  1. Get info about this flags (rom the URL -> useParams)
  2. Separate out the logs from the return flag so that
    flag only has information without logs (object destructuring, removing the logs property)
    - Use tab nav to swap between views (https://mui.com/material-ui/react-tabs/)
  
  // Nav Bar
    // Flag Info / TS Data / Logs
  
*/

function FlagDashboard() {
  const { flagId } = useParams();

  return (
    <>
      <Container></Container>
    </>
  );
}

export default FlagDashboard;
