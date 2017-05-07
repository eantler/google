import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import DevTools from './components/DevTools';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ButtonAppBar from './components/ButtonAppBar/ButtonAppBar';
// Import Actions
import { toggleAddPost, fetchCurrentUser } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';


export class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = { isMounted: false,
                   isAuthenticated: false,
                   user: undefined};

  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line

  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());

  };



  render() {
    return (
      <div >
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
          <Helmet
            title="Semsim Memes"
            titleTemplate="%s - Semsim Memes"
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
          <ButtonAppBar isAuthenticated={this.props.isAuthenticated} user={this.props.user} dispatch={this.props.dispatch}/>

          <div className={styles.container}>

            {this.props.children}
          </div>
          <Footer />
      </div>
    );
  }
}

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
