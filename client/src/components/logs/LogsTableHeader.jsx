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

function LogsTableHeader({ handleFilter }) {

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
          <Chip size="small" label="Created" icon={<AddIcon />} onClick={() => handleFilter('create')} />
          <Chip size="small" label="Updated" icon={<EditIcon />} onClick={() => handleFilter('update')} />
          <Chip size="small" label="Deleted" icon={<DeleteIcon />} onClick={() => handleFilter('delete')} />
          <Chip size="small" label="Flag On" icon={<FlagIcon />} onClick={() => handleFilter('flag_on')} />
          <Chip size="small" label="Flag Off" icon={<FlagIcon />} onClick={() => handleFilter('flag_off')} />
          <Chip size="small" label="Circuit Open" icon={<CircuitOpenIcon />} onClick={() => handleFilter('circuit_open')} />
          <Chip size="small" label="Circuit Close" icon={<CircuitCloseIcon />} onClick={() => handleFilter('circuit_close')} />
          <Chip size="small" label="All" icon={<RestoreIcon />} onClick={() => handleFilter('all')} />
        </Stack>
      </AppBar>
    </Box>
  );
}

export default LogsTableHeader;