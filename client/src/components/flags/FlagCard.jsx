// import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';

// const FlagCard = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

import { Link, Paper, Typography } from '@mui/material/';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function FlagCard({ flag }) {
  return (
    <Link component={RouterLink} to={`/flags/${flag.id}`}>
      <Paper>
        <Typography variant="h6">{flag.title}</Typography>
      </Paper>
    </Link>
  );
}

export default FlagCard;
