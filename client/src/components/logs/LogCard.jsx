import React from 'react';
import {
  Card,
  CardContent,
  Typography,
} from '../../../node_modules/@mui/material/index';

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
