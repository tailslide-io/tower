import { Container, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Paper, AppBar, Toolbar, Typography, TextField, IconButton, Snackbar, Alert, DialogContentText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import apiClient from 'lib/apiClient';

const AuthContainer = () => {
  const [key, setKey] = useState('')
  const [open, setOpen] = useState(false)
  const [openKeyConfirm, setOpenKeyConfirm] = useState(false)

  useEffect(() => {
    async function getKey() {
      const returnKey = await apiClient.fetchKey()
      if (!returnKey) {
        setKey('No key in database - Click button to generate.')
      } else {
        setKey(returnKey)
      }
    }

    getKey()
  }, [])

  const newKeyHandler = async () => {
    const newKey = await apiClient.createKey()
    setKey(newKey)
    handleCloseKeyConfirm()
  }

  const handleCopyClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(key)
  }

  const handleOpenKeyConfirm = () => {
    setOpenKeyConfirm(true);
  };

  const handleCloseKeyConfirm = () => {
    setOpenKeyConfirm(false);
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 2 }}>
      <AppBar position="static" elevation={0} color='transparent'>
        <Toolbar disableGutters sx={{ mx: 1, mt: 0 }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            SDK Key
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper sx={{ p: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <TextField disabled fullWidth value={key} onChange={() => {}} size='small' />
          </Grid>
          <Grid item xs={1}>
           <IconButton onClick={handleCopyClick}>
              <ContentCopyIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
           <IconButton onClick={handleOpenKeyConfirm}>
              <AutorenewIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Snackbar
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={2000}
        >
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            Copied to Clipboard
          </Alert>
        </Snackbar>
        <Dialog
          open={openKeyConfirm}
          onClose={handleCloseKeyConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Creating a new SDK Key`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to generate a new SDK Key?  This action can not be undone. Your previous key will be invalidated and all SDK instances must be updated to the new key.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseKeyConfirm}>Cancel</Button>
            <Button onClick={newKeyHandler} autoFocus>
              Generate New Key
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  )
}

export default AuthContainer