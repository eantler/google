// @flow weak

import React, { PropTypes } from 'react';
import connect from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Text from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import ToysIcon from 'material-ui-icons/Toys';
import { makeLoginWithGoogle } from '../../AppActions';

//Create StyleSheets
import { createStyleSheet, createStyleManager } from 'jss-theme-reactor';;
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';

const styleSheet = createStyleSheet('ButtonAppBar', () => ({
  root: {
    position: 'relative',
    marginTop: 0,
    width: '100%',
  },
  appBar: {
    position: 'relative',

  },
  flex: {
    flex: 1,
    color: 'rgb(255,255,255)',
  },
  extraButton: {
    margin: '0px 10px 0px 10px',
//    padding: '10px',
  }
}));


export default function ButtonAppBar(props, context) {
  const styleManager = createStyleManager({
      jss: createJss(preset()),
      theme: props.theme,
    });


  const classes = styleManager.render(styleSheet);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton >
            <ToysIcon className={classes.flex}>add_circle</ToysIcon>
          </IconButton>
          <Text type="title" className={classes.flex}>SimMeme</Text>
          <Button raised className={classes.extraButton}>Random Meme</Button>
          <Button raised className={classes.extraButton}>Compose meme</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    isAuthenticated: store.app.isAuthenticated,
    user: store.app.user,
  };
}

// ButtonAppBar.contextTypes = {
//   //styleManager: customPropTypes.muiRequired,
// };

ButtonAppBar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
}
