import React from 'react';
import { Paper, Typography } from '../../../node_modules/@mui/material/index';

function LogCard({ log }) {
  return (
    <Paper variant="outlined" square>
      <Typography>Corresponding Flag: {log.flag_id}</Typography>
      <Typography>Log Action: {log.action_type}</Typography>
      <br></br>
    </Paper>
  );
}

export default LogCard;

/*
    <Card}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          
        </Typography>
      </CardContent>
    </Card>
*/
