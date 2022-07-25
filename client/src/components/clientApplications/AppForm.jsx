import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const AppForm = ({ appTitle, appId = null, formActionLabel, formAction, callback }) => {
  const [ formAppTitle, setFormAppTitle ] = useState(appTitle)

  const handleSubmit = () => {
    const appObj = { formAppTitle }

    if (appId) {
      appObj.appId = appId
    }

    formAction(appObj);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        elevation={1}
        sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h6" gutterBottom>
          {formActionLabel === 'Create' ? 'New App' : 'Update App'}
        </Typography>
        <TextField
          required
          name="appTitle"
          label="App Title"
          fullWidth
          autoComplete="off"
          variant="standard"
          value={formAppTitle}
          onChange={(e) =>
            setFormAppTitle(e.target.value)
          }
        />
        <Button
          type="button"
          variant="contained"
          onClick={handleSubmit}
          sx={{ mt: 3, ml: 1 }}
        >
          {formActionLabel}
        </Button>
        <Button
          type="button"
          variant="contained"
          color="grey"
          onClick={callback}
          sx={{ mt: 3, ml: 1 }}
        >
          Cancel
        </Button>
      </Paper>
    </Container>
  )
}

export default AppForm