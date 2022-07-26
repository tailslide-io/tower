import { Container, Button, Grid, Paper, AppBar, Toolbar, Typography, TextField, IconButton } from '@mui/material'
import React from 'react'
import AutorenewIcon from '@mui/icons-material/Autorenew';


const AuthContainer = () => {
  const sdkKey = '7e81a3ad-6ba3-4d3e-a1bb-5a27660a0ec3'

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
          <Grid item xs={9}>
            <TextField disabled fullWidth defaultValue={sdkKey} size='small' />
          </Grid>
          <Grid item xs={2}>
           <Button fullWidth variant='contained'>
              Copy
            </Button>
          </Grid>
          <Grid item xs={1}>
           <IconButton>
              <AutorenewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default AuthContainer