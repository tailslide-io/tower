import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';
import { Chip, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function LogsTableHeader({ handleFilter, setPage }) {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const red = theme.palette.error.main;
  const green = theme.palette.success.main;


  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar position="static" elevation={0} color='transparent'>
        <Toolbar disableGutters sx={{ mx: 1, mt: 0 }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {`All Flag Logs`}
          </Typography>
        </Toolbar>
        <Stack direction="row" spacing={1} sx={{ ml: 1, mb: 1 }}>
          <Chip size="small" label="Created" icon={<AddIcon sx={{ "&&": { color: secondary } }}/>} onClick={() => {setPage(0); handleFilter('create')}} />
          <Chip size="small" label="Updated" icon={<EditIcon sx={{ "&&": { color: primary } }}/>} onClick={() => {setPage(0); handleFilter('update')}} />
          <Chip size="small" label="Deleted" icon={<DeleteIcon sx={{ "&&": { color: red } }}/>} onClick={() => {setPage(0); handleFilter('delete')}} />
          <Chip size="small" label="Flag On" icon={<FlagIcon sx={{ "&&": { color: green } }}/>} onClick={() => {setPage(0); handleFilter('flag_on')}} />
          <Chip size="small" label="Flag Off" icon={<FlagIcon sx={{ "&&": { color: red } }}/>} onClick={() => {setPage(0); handleFilter('flag_off')}} />
          <Chip size="small" label="Circuit Open" icon={<CircuitOpenIcon sx={{ "&&": { color: red } }}/>} onClick={() => {setPage(0); handleFilter('circuit_open')}} />
          <Chip size="small" label="Circuit Close" icon={<CircuitCloseIcon sx={{ "&&": { color: green } }}/>} onClick={() => {setPage(0); handleFilter('circuit_close')}} />
          <Chip size="small" label="All" icon={<RestoreIcon sx={{ "&&": { color: primary } }}/>} onClick={() => {setPage(0); handleFilter('all')}} />
        </Stack>
      </AppBar>
    </Box>
  );
}

export default LogsTableHeader;