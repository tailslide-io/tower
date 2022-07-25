import { styled, Switch } from '@mui/material';

const FlagSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb': {
        backgroundColor: '#4caf50',
        width: 32,
        height: 32,
        '&:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>')`,
        },
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#4caf50',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#f44336',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M14.4 6 14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#f44336',
    borderRadius: 20 / 2,
  },
}));

export default FlagSwitch