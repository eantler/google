/**
 * Client entry point
 */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { configureStore } from './store';

//Material Ui

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createStyleManager from '../config/palette';


// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');
const theme = createStyleManager();

const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

render(
  <MuiThemeProvider styleManager={theme} theme={theme} sheetsManager={new Map()}>
    <AppContainer>
      <App store={store} />
    </AppContainer>
  </MuiThemeProvider>,
  mountApp
);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./App').default; // eslint-disable-line global-require
    render(
      <MuiThemeProvider styleManager={theme} sheetsManager={new Map()} theme={theme}>
        <AppContainer>
          <NextApp store={store} />
        </AppContainer>
      </MuiThemeProvider>,
      mountApp
    );
  });
}
