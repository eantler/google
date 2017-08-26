
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import { pink,cyan,lightBlue } from 'material-ui/styles/colors';
//palette for material-ui
import { createMuiTheme } from 'material-ui/styles';
export default function() {
  return createMuiTheme({

      palette: createPalette({

          primary: lightBlue,
          accent: pink,
          type: 'light',
      }),
    });
}
