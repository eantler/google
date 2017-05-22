import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';
import { createStyleSheet } from 'jss-theme-reactor';;

// Import Components
import Helmet from 'react-helmet';
import customPropTypes from 'material-ui/utils/customPropTypes';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
import Search from './components/Search/Search';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

// Import Actions
import { toggleAddPost, fetchCurrentUser } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';
import ImageDialog from '../Results/components/ImageDialog/ImageDialog';

// Creating style sheet
const styleSheet = createStyleSheet('InteractiveGrid', () => {
  return {
    root: {
      flexGrow: 1,
      marginTop: '30px',
    },
    demo: {
      height: 240,
    },
    paper: {
      padding: 12,
      height: '100%',
    },
    control: {
      padding: 12,
    },
  };
});



export class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = { isMounted: false,
                   isAuthenticated: false,
                   user: undefined};
    this.styleManager = context.styleManager;

  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line

  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());

  };



  render() {
      let classes = this.styleManager.render(styleSheet);

    return (
      <div >
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
          <Helmet
            title="Sim Memes"
            titleTemplate="%s - Sim Memes"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <ImageDialog/>
          <ButtonAppBar isAuthenticated={this.props.isAuthenticated} user={this.props.user} dispatch={this.props.dispatch}/>
          <Grid container className={classes.root} justify='center' gutter={24}>
            <Grid item xs={10}>
              <Search />
            </Grid>
          </Grid>
            {this.props.children}
          <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,

};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    isAuthenticated: store.app.isAuthenticated,
    user: store.app.user,
  };
}

export default connect(mapStateToProps)(App);

// <Header
//   switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
//   intl={this.props.intl}
//   toggleAddPost={this.toggleAddPostSection}
// />
