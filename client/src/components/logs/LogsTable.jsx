import React, { useState } from 'react';
import { Container, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, styled, TablePagination, tableCellClasses } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import CircuitCloseIcon from 'components/utilities/CircuitCloseIcon';
import CircuitOpenIcon from 'components/utilities/CircuitOpenIcon';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function actionTypeIcon(type) {
  switch (type) {
    case 'create':
      return (
        <>
        <AddIcon color='secondary'/>
      </>
      )
    case 'update':
      return (
        <>
          <EditIcon color='primary'/>
        </>
      )
    case 'delete':
      return (
        <>
          <DeleteIcon color="error"/>
        </>
      )
    case 'circuit_open':
      return (
        <>
          <CircuitOpenIcon color="error"/>
        </>
      )
    case 'circuit_close':
      return (
        <>
          <CircuitCloseIcon color="success"/>
        </>
      )
    case 'flag_on':
      return (
        <>
          <FlagIcon color="success"/>
        </>
      )
    case 'flag_off':
      return (
        <>
          <FlagIcon color="error"/>
        </>
      )
    default:
      return ''
  }
}

function LogsTable({ logs }) {

  const [page, setPage]= useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ my: 4 }}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow >
            <StyledTableCell></StyledTableCell>
            <StyledTableCell >Log Event</StyledTableCell>
            <StyledTableCell >Flag ID</StyledTableCell>
            <StyledTableCell >Flag Name</StyledTableCell>
            <StyledTableCell >Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((log) => (
            <StyledTableRow
              key={log.log_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {actionTypeIcon(log.action_type)}
              </TableCell>
              <TableCell >{log.log_description}</TableCell>
              <TableCell >{log.flag_id ? log.flag_id : 'Deleted'}</TableCell>
              <TableCell >{log.flag_title}</TableCell>
              <TableCell >{new Date(log.created_at).toLocaleString()}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25]}
      component="div"
      count={logs.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Container>
  );
}

export default LogsTable
