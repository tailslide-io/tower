import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#2285e1',
    },
    secondary: {
      main: '#ffa114',
      dark: '#ffb74d'
    },
    background: {
      default: '#eeeeee',
      paper: '#ffffff',
    },
    text: {
      primary: '#24384e',
      secondary: 'rgba(36,56,78,0.67)',
      disabled: 'rgba(36,56,78,0.51)',
    },
  },
  typography: {
    fontFamily: 'Poppins',
  },
});

export default defaultTheme