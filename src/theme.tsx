import { createTheme } from '@mui/material/styles';
import { green, grey, purple, red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[400],
    },
  },
});

export default theme;