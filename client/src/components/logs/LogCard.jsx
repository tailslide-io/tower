import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

function LogCard({ log }) {
  // return (
  //   <Paper variant="outlined" square>
  //     <Typography>Corresponding Flag: {log.flag_id}</Typography>
  //     <Typography>Log Action: {log.action_type}</Typography>
  //     <br></br>
  //   </Paper>
  // );
  return (
    <Card>
      <CardContent>
        <Typography>Corresponding Flag: {log.flag_id}</Typography>
        <Typography>Log Action: {log.action_type}</Typography>
      </CardContent>
    </Card>
  );
}

export default LogCard;

/*
return (
    <Card>
      <CardContent>
        <Typography >
          Corresponding Flag: {log.flag_id}
        </Typography>
        <Typography>
          Log Action: {log.action_type}
        </Typography>
      </CardContent>
    </Card>
)
*/
