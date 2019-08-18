import { createMuiTheme } from '@material-ui/core/styles';
import {
  deepOrange, amber,
} from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: amber
  },
});

export default theme;
