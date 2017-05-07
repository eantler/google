
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { pink,cyan,lightBlue } from 'material-ui/styles/colors';
//palette for material-ui

export default function() {
  return MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({

      palette: createPalette({

          primary: lightBlue,
          accent: pink,
          type: 'light',
      }),
    }),
  });
}
