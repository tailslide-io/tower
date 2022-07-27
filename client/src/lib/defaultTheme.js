import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#2285e1',
    },
    secondary: {
      main: '#ff9100',
      dark: '#b26500',
      light: '#ffa733'
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
  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        separator: {
          color: 'white'
        }
      }
    }
  }
});

export default defaultTheme