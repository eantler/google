import Express from 'express';
import expressSessions from 'express-session';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import IntlWrapper from '../client/modules/Intl/IntlWrapper';
import mongoConnect from 'connect-mongo'; // this is to connect session to store

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import posts from './routes/post.routes';
import dummyData from './dummyData';
import serverConfig from './config';

// Import Material Ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createStyleManager from '../config/palette';

// Import Passport
import passport from 'passport';
import cookieParser from 'cookie-parser';
import passportGoogle from 'passport-google-oauth'
import googleCredentials from '../config/google';
import * as passportHandler from './passportHandle';
let GoogleStrategy = passportGoogle.OAuth2Strategy;

//set up styles
const { styleManager, theme } = createStyleManager();
const css = styleManager.sheetsToString();
// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  // feed some dummy data in DB.
  dummyData();
});



//set up google Authentication
passport.use(new GoogleStrategy({
    clientID: googleCredentials.GOOGLE_CLIENT_ID,
    clientSecret: googleCredentials.GOOGLE_CLIENT_SECRET,
    callbackURL: googleCredentials.callbackURL,

  }, passportHandler.handleGoogleStrategy));

// how to serialize user
passport.serializeUser(passportHandler.serializeUser);
passport.deserializeUser(passportHandler.deserializeUser);

// configure mongo store
const MongoStore = mongoConnect(expressSessions);
// configure for passport
app.use(Express.static(path.resolve(__dirname, '../dist')));
//app.use(cookieParser()); - not needed in latest express-session
app.use(
    expressSessions(
        {
          secret: 'fdsadkfjhkadjfd_Dfd9sdsd342',
          resave: true,
          saveUninitialized: true,
          cookie: {maxAge: 2592000000}, // one month
          store: new MongoStore({ mongooseConnection: mongoose.connection }),
        }
      ));



app.use(passport.initialize());
app.use(passport.session());


// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));



app.use('/api', posts);

// login with google
 app.use('/auth/google/redirect',
 passport.authenticate('google', { scope: ['email profile'] }));

 app.use('/auth/google/callback',
   passport.authenticate('google', { failureRedirect: '/auth/failed' }),
   function(req, res) {
     console.log('auth success');

     res.redirect('/');
   });
//logout
app.use('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
// Render Initial HTML
const renderFullPage = (html, css, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="http://res.cloudinary.com/hashnode/image/upload/v1455629445/static_imgs/mern/mern-favicon-circle-fill.png" type="image/png" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <style id="jss-server-side">${css}</style>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
 app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {

    let user = req.user;
    if (user === undefined) {
      user = {};
    } else {
      user = req.user[0];
    }

    console.log (`isAuthenticated: ${JSON.stringify(user)}`);
    console.log (`User: ${JSON.stringify(req.user)}`);

    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore({
      app : {
        showAddPost: false,
        isAuthenticated: false,
        user: user,
        tags: [{ key: 0 , label: 'test' }]
      },
    });


    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <MuiThemeProvider styleManager={styleManager} theme={theme}>
            <Provider store={store}>
              <IntlWrapper>
                <RouterContext {...renderProps} />
              </IntlWrapper>
            </Provider>
          </MuiThemeProvider>
        );


        const finalState = store.getState();;


        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, css, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`server running on port: ${serverConfig.port}`); // eslint-disable-line
  }
});

export default app;
