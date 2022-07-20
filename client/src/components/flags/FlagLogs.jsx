import React from 'react';
import { useParams } from 'react-router-dom';

function FlagLogs() {
  const { flagId } = useParams();

  // const logs = useSelector((state) => state.logs).filter(
  //   (log) => log.flag_id === flagId
  // );

  console.log('rendering the FlagLogs Component');
  // return (
  //   <Box sx={{ width: '100%' }}>
  //     <Stack spacing={2}>
  //       {logs.map((log) => (
  //         <LogCard key={log.id} log={log} />
  //       ))}
  //     </Stack>
  //   </Box>
  // );
  return <div>Flag logs</div>;
}

export default FlagLogs;
